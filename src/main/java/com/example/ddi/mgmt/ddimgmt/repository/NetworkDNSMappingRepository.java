package com.example.ddi.mgmt.ddimgmt.repository;

import com.example.ddi.mgmt.ddimgmt.model.DNSNetworkMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NetworkDNSMappingRepository extends JpaRepository<DNSNetworkMapping, Long> {

}
