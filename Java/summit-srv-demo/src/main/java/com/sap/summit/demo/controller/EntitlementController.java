
/**
 * Project Name:summit-srv-demo 
 * File Name:EntitlementController.java <br/><br/>  
 * Description: TODO
 * Copyright: Copyright (c) 2017 
 * Company:SAP
 * 
 * @author SAP
 * @date Apr 26, 2018 4:15:47 PM
 * @version 
 * @see
 * @since 
 */
package com.sap.summit.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sap.summit.demo.dto.DropDown;
import com.sap.summit.demo.dto.EntitlementDto;
import com.sap.summit.demo.dto.SearchCriteria;
import com.sap.summit.demo.dto.TransactionDto;
import com.sap.summit.demo.service.EntitlementService;
import com.sap.summit.message.ApiMessage;
import com.sap.summit.message.util.MessageUtil;

/**
 * ClassName: EntitlementController <br/>
 * <br/>
 * Description: 
 * 业务逻辑描述：
 * Module1: 首先在New Entitlement App中创建新的Entitlement（产品授权），这里所有的产品授权的初始公司
 * 属性都是SAP的。
 * ************
 * 这里创建的一批Entitlements就类似于生成了一批产品等待批发给企业，比如生产了100个
 * Office等待企业用户批量购买OEM版
 * 
 * 
 * 
 * Module2: 之后在EMS BlockChain App中，我们可以将在Module1中创建的Entitlements(正如上面所说
 * 这里的Entitlements仍属于SAP EMS)在这里进行Split，分给各家与SAP EMS签订了协议的公司，比如Microsoft
 * 购买了quantity为100的Entitlements，我们就分配100个Entitlements给Microsoft，在底下的Table中就会
 * 多出一条Row，每次点击Publish就相当于将这个Entitlement设置成为了一条Transaction记录在了链上
 * ************
 * 这里的Split就相当于企业与SAP签订了购买特点数目的Entitlements产品的协议，完成购买后该产品的100个
 * 授权被分配给了企业，比如Unknown Company购买了50个OEM Office套件，此时就分出50个给Unknown Company
 * 
 * 
 * 
 * Module3: 最后在Customer App中，这个App是面向客户的App，比如微软内的员工，在企业Customer购买了
 * 100个批量Entitlements的情况下，可以点击特定的Entitlements，并点击Purchase，consume了一个企业
 * 的Entitlements，最终完成整比交易
 * ************
 * 这里的Purchase就相当Consume企业批量购买的Entitlements，比如一个Unknown Company的员工安装了
 * 一套OEM Office套件，那么Purchase之后Unknown Company的套件就少了一个
 * 
 * 不过似乎在这套系统中Customer可以看到Split之后所有Company所有的Entitlements，因为这只是一个没有
 * 具体用途的POC，所以并没有严格的限定应用场景，在现实中上面规划的应用场景就是该POC的一种可能实现
 * 
 * 
 * @author SAP
 * @version
 * @see
 * @since
 */
@RestController
@RequestMapping
public class EntitlementController
{
	// Autowired Service Bean
    @Autowired
    private EntitlementService entitlementService;
    
    // Testing API
    @GetMapping(value = "/test/blockchain/api/{url}")
    public ApiMessage<List<EntitlementDto>> testBlockChainApi(@PathVariable("url") String url)
    {
        return MessageUtil.getSuccessMessage(entitlementService.testBlockChainApi(url));
    }
    
    //Module2 + Module3:获取整体的Table信息，即App2和App3中展示的Table栏，过滤条件根据“请求来自App2还是App3”,“是否过滤公司名字”来确定返回并显示哪些Item Rows
    @PostMapping(value = "/entitlements", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<List<EntitlementDto>> getAll(@RequestBody SearchCriteria filter)
    {
        return MessageUtil.getSuccessMessage(entitlementService.getAll(filter));
    }
    
    //Module2: 负责将选中的Entitlements Publish到链上去，Split之后将相关交易上链
    @PostMapping(value = "/entitlement/publish", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<EntitlementDto> publish(@RequestBody EntitlementDto dto)
    {
        EntitlementDto entitlementDto = entitlementService.publish(dto);
        return MessageUtil.getSuccessMessage(entitlementDto);
    }

    //Module1 & Module3公用一个API: 点击一个Entitlement记录就会弹出与该Entitlement相关的Transaction信息，用来取Entitlements的交易信息的
    @GetMapping(value = "/entitlement/transaction/{guid}")
    public ApiMessage<List<TransactionDto>> getTransactionDetail(@PathVariable("guid") String guid)
    {
        List<TransactionDto> list = entitlementService.getTransactionDetail(guid);
        return MessageUtil.getSuccessMessage(list);
    }

    //Mudule3: 针对Customer，负责将相关Entitlements信息持久化到数据库中，针对Purchase功能，注意POST方法
    @PostMapping(value = "/entitlement/transaction/user", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<List<EntitlementDto>> transctionToUser(@RequestBody EntitlementDto dto)
    {
        List<EntitlementDto> list = entitlementService.transaction(dto, "user");
        return MessageUtil.getSuccessMessage(list);
    }

    //Module2: 针对Company(提供Entitlements的Company)，负责将相关Entitlements Split的信息持久化到数据库中，针对Split功能，注意POST方法
    @PostMapping(value = "/entitlement/transaction/company", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<List<EntitlementDto>> transctionToCompany(@RequestBody EntitlementDto dto)
    {
        List<EntitlementDto> list = entitlementService.transaction(dto, "company");
        return MessageUtil.getSuccessMessage(list);
    }

    //Module2 & Module3: Validate每一笔Entitlement
    @PostMapping(value = "/entitlement/validation")
    public ApiMessage<Boolean> validate(@RequestBody EntitlementDto entitlementDto)
    {
        return MessageUtil.getSuccessMessage(entitlementService.validateBilateralEntitlement(entitlementDto));
    }

    //Module2: 获取公司信息，并展示到前端界面的下拉菜单上，对应于Dropdown
    @GetMapping(value = "/entitlement/companies")
    public ApiMessage<List<DropDown>> getCompanies()
    {
        return MessageUtil.getSuccessMessage(entitlementService.getCompanies());
    }
    
    //Module3: 获取客户信息，并展示到前端界面的下拉菜单上,对应于Dropdown
    @GetMapping(value = "/entitlement/customers")
    public ApiMessage<List<DropDown>> getUsers()
    {
        return MessageUtil.getSuccessMessage(entitlementService.getUsers());
    }

    //Module1: 将在Module1表单中填写的Entitlements信息POST到后套数据库中，创建一批Entitlements
    @PostMapping(value = "/entitlement", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<EntitlementDto> create(@RequestBody EntitlementDto entitlementDto)
    {
        return MessageUtil.getSuccessMessage(entitlementService.create(entitlementDto));
    }

    //Module1: 同上同信息，用于更新某部分Entitlements的信息
    @PutMapping(value = "/entitlement", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiMessage<EntitlementDto> update(EntitlementDto entitlementDto)
    {
        return MessageUtil.getSuccessMessage(entitlementService.update(entitlementDto));
    }

    //Module1: 输入Entitlements的GUID，将某一批Entitlements完全删除
    @DeleteMapping(value = "/entitlement/{guid}")
    public ApiMessage<EntitlementDto> delete(@PathVariable("guid") String guid)
    {
        EntitlementDto dto = entitlementService.delete(guid);
        return MessageUtil.getSuccessMessage(dto);
    }

}
