package com.example.ddi.mgmt.ddimgmt.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
@Entity
@Table(name="Networkinfo")
public class NetworkInfo {
  @Id
  @Column(name= "network_address")
  @JsonProperty("network_address")
  private String networkAddress;

  @Column(name= "network_name")
  @JsonProperty("network_name")
  private String networkName;

  @Column(name= "default_gateway")
  @JsonProperty("default_gateway")
  private String defaultGateway;

  @Column(name= "vlan_id")
  @JsonProperty("vlan_id")
  private String vlanId;

  @Column(name= "city")
  @JsonProperty("city")
  private String city;

  public Set<String> getDnsServers() {
    return dnsServers;
  }

  public void setDnsServers(Set<String> dnsServers) {
    this.dnsServers = dnsServers;
  }

  @Transient
  @JsonProperty("dns_servers")
  Set<String> dnsServers;

  public String getNetworkAddress() {
    return networkAddress;
  }

  public void setNetworkAddress(String networkAddress) {
    this.networkAddress = networkAddress;
  }

  public String getNetworkName() {
    return networkName;
  }

  public void setNetworkName(String networkName) {
    this.networkName = networkName;
  }

  public String getDefaultGateway() {
    return defaultGateway;
  }

  public void setDefaultGateway(String defaultGateway) {
    this.defaultGateway = defaultGateway;
  }

  public String getVlanId() {
    return vlanId;
  }

  public void setVlanId(String vlanId) {
    this.vlanId = vlanId;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }
}
