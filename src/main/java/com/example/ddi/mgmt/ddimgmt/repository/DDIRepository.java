package com.example.ddi.mgmt.ddimgmt.repository;

import com.example.ddi.mgmt.ddimgmt.model.DNSMapping;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DDIRepository extends JpaRepository<DNSMapping, Long> {

//   @Transactional
//   @Modifying
//   @Query("INSERT INTO DNSMapping (ip_address, domain_name, record_type, max_address, comment, email_id) VALUES (:ip, :domain, :recordType, :maxAddress, :comment, :emailId)")
//   void insertData(
//       @Param("ip") String ip,
//       @Param("domain") String domain,
//       @Param("recordType") String recordType,
//       @Param("maxAddress") String maxAddress,
//       @Param("comment") String comment,
//       @Param("emailId") String emailId);




   @Query("SELECT d FROM DNSMapping d WHERE d.ip_address like %:ip% or d.domain_name like %:ip%")
   Optional<List<DNSMapping>> findByIp(@Param("ip") String ip);

   @Query("SELECT d FROM DNSMapping d WHERE d.domain_name = :domainName")
   Optional<List<DNSMapping>> findByDomain(@Param("domainName") String domainName);

   @Modifying
   @Transactional
   @Query("UPDATE DNSMapping e SET e.domain_name = ?1, e.record_type = ?2, e.max_address = ?3, e.comment = ?4, e.email_id = ?5  WHERE e.ip_address = ?6")
   int updateByIP(String domain, String record, String maxAddress, String comment, String emailId, String ipAddress);

   @Modifying
   @Transactional
   @Query("Delete from DNSMapping d where d.ip_address = ?1")
   int deleteByIP(String ip);
}
