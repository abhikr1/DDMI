package com.example.ddi.mgmt.ddimgmt.controller;

import com.example.ddi.mgmt.ddimgmt.model.DNSMapping;
import com.example.ddi.mgmt.ddimgmt.model.DNSNetworkMapping;
import com.example.ddi.mgmt.ddimgmt.model.NetworkInfo;
import com.example.ddi.mgmt.ddimgmt.repository.NetworkDNSMappingRepository;
import com.example.ddi.mgmt.ddimgmt.repository.NetworkRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = {"Content-Type"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class NetworkController {

  @Autowired
  NetworkRepository networkRepository;
  @Autowired
  NetworkDNSMappingRepository networkDNSMappingRepository;

  @PostMapping("/network/createNetwork")
  public ResponseEntity<String> createNetwork(@RequestBody NetworkInfo networkInfo) {
      networkRepository.save(networkInfo);
      for(String dnsServer : networkInfo.getDnsServers()){
        DNSNetworkMapping dnsNetworkMapping = new DNSNetworkMapping();
        dnsNetworkMapping.setNetworkAddress(networkInfo.getNetworkAddress());
        dnsNetworkMapping.setIpAddress(dnsServer);
        networkDNSMappingRepository.save(dnsNetworkMapping);
      }
    return new ResponseEntity<>("Created", HttpStatus.OK);
  }
  @GetMapping("/network/getNetworkDetails")
  public ResponseEntity<NetworkInfo> getDomain(@RequestParam("network_details") String networkDetails) {
    List<Object[]> a = networkRepository.findJoinedEntities(networkDetails);
    NetworkInfo networkInfo = null;
    Set<String> dnsServers = new HashSet<>();
    for(Object[] ar: a){
      networkInfo = (NetworkInfo)ar[0];
      DNSNetworkMapping ob = (DNSNetworkMapping)ar[1];
      dnsServers.add(ob.getIpAddress());
    }
    networkInfo.setDnsServers(dnsServers);
    return new ResponseEntity<>(networkInfo, HttpStatus.OK);
  }

  @DeleteMapping("/network/deleteNetwork")
  public ResponseEntity<String> deleteNetwork(@RequestBody NetworkInfo networkInfo) {
    networkRepository.deleteByNetworkInMapping(networkInfo.getNetworkAddress());
    networkRepository.deleteByNetwork(networkInfo.getNetworkAddress());
    return new ResponseEntity<>("Deleted", HttpStatus.OK);
  }

}
