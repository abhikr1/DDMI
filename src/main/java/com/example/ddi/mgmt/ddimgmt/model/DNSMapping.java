package com.example.ddi.mgmt.ddimgmt.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.lang.NonNull;
import javax.validation.constraints.NotNull;


@Entity
@Table(name="DNSMapping")
public class DNSMapping{


  public String getIp_address() {
    return ip_address;
  }

  public void setIp_address(String ip_address) {
    this.ip_address = ip_address;
  }

  public String getDomain_name() {
    return domain_name;
  }

  public void setDomain_name(String domain_name) {
    this.domain_name = domain_name;
  }

  public String getRecord_type() {
    return record_type;
  }

  public void setRecord_type(String record_type) {
    this.record_type = record_type;
  }

  public String getMax_address() {
    return max_address;
  }

  public void setMax_address(String max_address) {
    this.max_address = max_address;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public String getEmail_id() {
    return email_id;
  }

  public void setEmail_id(String email_id) {
    this.email_id = email_id;
  }

  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name= "ip_address")
  @JsonProperty("ip_address")
  private String ip_address;

  @Column(name= "domain_name")
  @JsonProperty("domain_name")
  private String domain_name;

  @Column(name= "record_type")
  @JsonProperty("record_type")
  private String record_type;

  @Column(name= "max_address")
  @JsonProperty("max_address")
  private String max_address;

  @Column(name= "comment")
  @JsonProperty("comment")
  private String comment;

  @Column(name= "email_id")
  @JsonProperty("email_id")
  private String email_id;
}
