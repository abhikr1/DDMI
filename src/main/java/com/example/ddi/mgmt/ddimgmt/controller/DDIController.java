package com.example.ddi.mgmt.ddimgmt.controller;

import com.example.ddi.mgmt.ddimgmt.model.DNSMapping;
import com.example.ddi.mgmt.ddimgmt.repository.DDIRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = {"Content-Type"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class DDIController {

  @Autowired
  DDIRepository ddiRepository;

  @PostMapping("/dns/createDns")
  public ResponseEntity<String> createDns(@RequestBody DNSMapping dnsMapping) {
    String message = "";
    if(dnsMapping.getIp_address() == null || dnsMapping.getIp_address().length() == 0){
      message = "IP cannot be null";
      return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
    Optional<List<DNSMapping>> optionalDNSMapping = ddiRepository.findByIp(dnsMapping.getIp_address());
    if(!optionalDNSMapping.isEmpty() && optionalDNSMapping.get().size() > 0){
      return new ResponseEntity<>("IP Already exist", HttpStatus.BAD_REQUEST);
    }
//    ddiRepository.insertData(dnsMapping.getIp_address(), dnsMapping.getDomain_name(),
//        dnsMapping.getRecord_type(), dnsMapping.getMax_address(), dnsMapping.getComment(), dnsMapping.getEmail_id());/// this line tells yu that the value in employee class is stored in database
//
    ddiRepository.save(dnsMapping);
    message = "IP created in Database";
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @GetMapping("/dns/getDomain")
  public ResponseEntity<List<DNSMapping>> getDomain(@RequestParam("ip") String ip) {
    Optional<List<DNSMapping>> optionalDNSMapping = ddiRepository.findByIp(ip);
    if(!optionalDNSMapping.isEmpty()){
      return new ResponseEntity<>(optionalDNSMapping.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }
  @GetMapping("/dns/getDomainAll")
  public ResponseEntity<List<DNSMapping>> getAllDomain() {
    List<DNSMapping> optionalDNSMapping = ddiRepository.findAll();
      return new ResponseEntity<>(optionalDNSMapping, HttpStatus.OK);
  }

  @GetMapping("/dns/getIp")
  public ResponseEntity<List<DNSMapping>> getIp(@RequestParam("domainName") String domain) {
    Optional<List<DNSMapping>> dnsMappingOptional = ddiRepository.findByDomain(domain);
    if(!dnsMappingOptional.isEmpty()){
      return new ResponseEntity<>(dnsMappingOptional.get(), HttpStatus.OK);
    }
    List<DNSMapping> dnsMappings = new ArrayList<>();
    DNSMapping dnsMapping = new DNSMapping();
    dnsMappings.add(dnsMapping);
    return new ResponseEntity<>(dnsMappings, HttpStatus.NOT_FOUND);
  }

  @PutMapping ("/dns/udpateDns")
  public ResponseEntity<String> updateDns(@RequestBody DNSMapping dnsMapping) {
    String message = "";
    if(dnsMapping.getIp_address() == null){
      return new ResponseEntity<>("Please provide valid IP!", HttpStatus.BAD_REQUEST);
    }
    Optional<List<DNSMapping>> dnsMappings = ddiRepository.findByIp(dnsMapping.getIp_address());
    if(dnsMappings.isEmpty()){
      return new ResponseEntity<>("No record found!", HttpStatus.BAD_REQUEST);
    }
    int affectedRow = ddiRepository.updateByIP(dnsMapping.getDomain_name(), dnsMapping.getRecord_type(), dnsMapping.getMax_address(), dnsMapping.getComment(), dnsMapping.getEmail_id(), dnsMapping.getIp_address());
    return new ResponseEntity<>( "Id: " + affectedRow + " updated", HttpStatus.OK);
  }

  @DeleteMapping ("/dns/deleteDns")
  public ResponseEntity<String> deleteDns(@RequestBody DNSMapping dnsMapping) {
    if(dnsMapping.getIp_address() == null){
      return new ResponseEntity<>("Please provide valid IP!", HttpStatus.BAD_REQUEST);
    }
    int deletedRow = ddiRepository.deleteByIP(dnsMapping.getIp_address());
    return new ResponseEntity<>( "Id: " + deletedRow + " deleted", HttpStatus.OK);
  }
}
