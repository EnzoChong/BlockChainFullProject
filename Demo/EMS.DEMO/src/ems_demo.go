package main

import (
"github.com/hyperledger/fabric/core/chaincode/shim"
"github.com/hyperledger/fabric/protos/peer"
"encoding/json"
	"fmt"
	"bytes"
	"strconv"
	"net/http"
)

type Transaction struct {
	OldEntitlementGUID 	string
	NewEntitlementGUID 	string
	UserID          	string
	Quantity			float64
	Type                string
}

type Entitlement struct {
	EntitlementGUID string
	EntitlementNo 	string
	Quantity        float64
	ValidFrom       string
	ValidTo         string
	Status          string
	CustomerID      string
	OwnedByID       string
	Type            string
}
type User struct {
	FirstName       string
	LastName        string
	Email           string
	Type            string

}

func main() {
	shim.Start(new(Transaction))
}

func (cc *Transaction) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}



func Success(rc int32, doc string, payload []byte) peer.Response {
	return peer.Response{
		Status:  rc,
		Message: doc,
		Payload: payload,
	}
}


func (cc *Transaction) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	function, args := stub.GetFunctionAndParameters()
	switch function {
	case "readEntitlement":     return readEntitlement(stub, args) //done
	case "createEntitlement":   return createEntitlement(stub, args) //done
	case "createUser":   		return createUser(stub, args)
	case "searchUser":   		return searchUser(stub, args)
	case "readUser":   			return readUser(stub, args)
	case "buyEntitlement":  	return buyEntitlement(stub, args)
	case "assignEntitlement":  	return assignEntitlement(stub, args)
	case "searchEntitlementForCompany":  	return searchEntitlementForCompany(stub, args)
	case "searchEntitlementForUser":  	return searchEntitlementForUser(stub, args)
	case "entitlementHistory": 	return entitlementHistory(stub, args)
	case "getAllEntitlements": 	return getAllEntitlements(stub, args)
	case "getAllTransactions": 	return getAllTransactions(stub, args)
	default:        			return shim.Error("Valid functions are 'read|write'!")
	}
}

func readEntitlement(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	key := "Entitlement:" + args[0]
	if value, err := stub.GetState(key); err == nil && value != nil {
		return shim.Success(value)
	}
	return shim.Error("Not Found")
}

func readUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	key := "User:" + args[0]
	if value, err := stub.GetState(key); err == nil && value != nil {
		return shim.Success(value)
	}
	return shim.Error("Not Found")
}

func searchEntitlementForCompany(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	company := "Company:" + args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"OwnedByID\":\"%s\"}}", company)
	resultsIterator,err:= stub.GetQueryResult(queryString)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	user,err:=getListResult(resultsIterator)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	return shim.Success(user)
}


func getAllTransactions(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	old :=  args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"OldEntitlementGUID\":\"%s\"}}", old)
	resultsIterator,err:= stub.GetQueryResult(queryString)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	user,err:=getListResult(resultsIterator)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	return shim.Success(user)
}


func getAllEntitlements(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"%s\"}}", "Entitlement")
	resultsIterator,err:= stub.GetQueryResult(queryString)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	user,err:=getListResult(resultsIterator)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	return shim.Success(user)
}


func searchEntitlementForUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	u := "User:" + args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"OwnedByID\":\"%s\"}}",u)
	resultsIterator,err:= stub.GetQueryResult(queryString)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	user,err:=getListResult(resultsIterator)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	return shim.Success(user)
}

func searchUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	name := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"FirstName\":\"%s\"}}", name)
	resultsIterator,err:= stub.GetQueryResult(queryString)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	user,err:=getListResult(resultsIterator)
	if err!=nil{
		return shim.Error("Rich query failed")
	}
	return shim.Success(user)
}

func createUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	cKey := "User:" + args[2]
	e := User{args[0],args[1],args[2],"User"}
	body,error := json.Marshal(e)
	if error != nil {
		return shim.Error(error.Error())
	}
	err2 := stub.PutState(cKey,[]byte(body))
	if err2 != nil {
		return shim.Error(err2.Error())
	}
	return Success(http.StatusOK, "OK", nil)
}


func createEntitlement(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	eKey := "Entitlement:" + args[0]
	cKey := "Company:SAP"
	Quantity, err := strconv.ParseFloat(args[2], 32);
	if err != nil {
		fmt.Printf("error convert to int %s",Quantity)
	}
	e := Entitlement{args[0],args[1],Quantity,args[3],args[4],args[5],args[6],cKey,"Entitlement"}
	body,error := json.Marshal(e)
	if error != nil {
		return shim.Error(error.Error())
	}
	err2 := stub.PutState(eKey,[]byte(body))
	if err2 != nil {
		return shim.Error(err2.Error())
	}
	return Success(http.StatusOK, "OK", nil)
}


func assignEntitlement(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	oldKey := "Entitlement:" + args[0]
	newKey := "Entitlement:" + args[1]
	company := "Company:" + args[2]
	tKey := "Transaction:" + args[0] + " " +args[1]
	Quantity, err := strconv.ParseFloat(args[3], 32);
	if err != nil {
		fmt.Printf("error convert to int %s",Quantity)
	}
	t := Transaction{args[0],args[1],company,Quantity,"Transaction"}

	dbEntitlementBytes, error1 := stub.GetState(oldKey)
	if error1!=nil{
		return shim.Error("{\"Error\":\"Failed to get state of  " + oldKey)
	}
	var dbEntitlement Entitlement;
	var newEntitlement Entitlement;

	error2 := json.Unmarshal(dbEntitlementBytes,&dbEntitlement)//反序列化
	if error2 !=nil{
		return shim.Error("{\"Error\":\"Failed to decode JSON of: " + string(dbEntitlementBytes)+ "\" to Entitlement}")
	}
	newEntitlement = dbEntitlement
	dbEntitlement.Quantity = dbEntitlement.Quantity - Quantity

	newEntitlement.EntitlementGUID = args[1]
	newEntitlement.OwnedByID = company
	newEntitlement.Quantity = Quantity
	newEntitlement.EntitlementNo = args[4]

	splitEntitlement,error6 := json.Marshal(newEntitlement)
	if error6 != nil{
		return shim.Error(error6.Error())
	}
	error7	:= stub.PutState(newKey,[]byte(splitEntitlement))
	if error7 !=nil{
		return shim.Error(error7.Error())
	}

	oldEntitlement,error3 := json.Marshal(dbEntitlement)
	if error3 != nil{
		return shim.Error(error3.Error())
	}
	error4	:= stub.PutState(oldKey,[]byte(oldEntitlement))
	if error4 !=nil{
		return shim.Error(error4.Error())
	}
	transaction,error5 := json.Marshal(t)
	if error5!= nil{
		return shim.Error("{\"Error\":\"Failed to encode transaction")
	}
	error8 := stub.PutState(tKey,[]byte(transaction))
	if error8 != nil{
		return shim.Error(error8.Error())
	}
	return Success(http.StatusOK, "OK", nil)
}

func buyEntitlement(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	oldKey := "Entitlement:" + args[0]
	newKey := "Entitlement:" + args[1]
	user := "User:" + args[2]
	tKey := "Transaction:" + args[0] + " " +args[1]
	Quantity, err := strconv.ParseFloat(args[3], 32);
	if err != nil {
		fmt.Printf("error convert to int %s",Quantity)
	}
	t := Transaction{args[0],args[1],user,Quantity,"Transaction"}

	dbEntitlementBytes, error1 := stub.GetState(oldKey)
	if error1!=nil{
		return shim.Error("{\"Error\":\"Failed to get state of  " + oldKey)
	}
	var dbEntitlement Entitlement;
	var newEntitlement Entitlement;

	error2 := json.Unmarshal(dbEntitlementBytes,&dbEntitlement)//反序列化
	if error2 !=nil{
		return shim.Error("{\"Error\":\"Failed to decode JSON of: " + string(dbEntitlementBytes)+ "\" to Entitlement}")
	}
	newEntitlement = dbEntitlement
	dbEntitlement.Quantity = dbEntitlement.Quantity - Quantity

	newEntitlement.EntitlementGUID = newKey
	newEntitlement.OwnedByID = user
	newEntitlement.Quantity = Quantity
	newEntitlement.EntitlementNo = args[4]


	splitEntitlement,error6 := json.Marshal(newEntitlement)
	if error6 != nil{
		return shim.Error(error6.Error())
	}
	error7	:= stub.PutState(newKey,[]byte(splitEntitlement))
	if error7 !=nil{
		return shim.Error(error7.Error())
	}

	oldEntitlement,error3 := json.Marshal(dbEntitlement)
	if error3 != nil{
		return shim.Error(error3.Error())
	}
	error4	:= stub.PutState(oldKey,[]byte(oldEntitlement))
	if error4 !=nil{
		return shim.Error(error4.Error())
	}
	transaction,error5 := json.Marshal(t)
	if error5!= nil{
		return shim.Error("{\"Error\":\"Failed to encode transaction")
	}
	error8 := stub.PutState(tKey,[]byte(transaction))
	if error8 != nil{
		return shim.Error(error8.Error())
	}
	return Success(http.StatusOK, "OK", nil)
}




func getListResult(resultsIterator shim.StateQueryIteratorInterface) ([]byte,error){

	defer resultsIterator.Close()
	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	fmt.Printf("queryResult:\n%s\n", buffer.String())
	return buffer.Bytes(), nil
}


func entitlementHistory(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	key := "Entitlement:" + args[0]
	it,err:= stub.GetHistoryForKey(key)
	if err!=nil{
		return shim.Error(err.Error())
	}
	var result,_= getHistoryListResult(it)
	return shim.Success(result)
}
func getHistoryListResult(resultsIterator shim.HistoryQueryIteratorInterface) ([]byte,error){

	defer resultsIterator.Close()
	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		item,_:= json.Marshal( queryResponse)
		buffer.Write(item)
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	fmt.Printf("queryResult:\n%s\n", buffer.String())
	return buffer.Bytes(), nil
}
