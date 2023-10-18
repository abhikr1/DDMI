package com.example.ddi.mgmt.ddimgmt.repository;

import com.example.ddi.mgmt.ddimgmt.model.DNSMapping;
import com.example.ddi.mgmt.ddimgmt.model.NetworkInfo;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NetworkRepository  extends JpaRepository<NetworkInfo, String> {

  @Query("SELECT a, b FROM NetworkInfo a JOIN DNSNetworkMapping b ON a.networkAddress = b.networkAddress WHERE a.networkAddress = :networkAddress")
  List<Object[]> findJoinedEntities(@Param("networkAddress") String networkAddress);

  @Modifying
  @Transactional
  @Query("Delete from NetworkInfo d where d.networkAddress = ?1")
  int deleteByNetwork(String networkAddress);

  @Modifying
  @Transactional
  @Query("Delete from DNSNetworkMapping d where d.networkAddress = ?1")
  int deleteByNetworkInMapping(String networkAddress);

}
