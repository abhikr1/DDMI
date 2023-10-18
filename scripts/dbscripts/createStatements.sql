CREATE DATABASE DDIMgmstSyss;
USE DDIMgmstSyss;
create table dnsmapping;

CREATE TABLE dnsmapping (
    id int primary key,
    ip_address varchar(255),
    domain_name varchar(255),
    record_type varchar(255),
    max_address varchar(255),
	comment varchar(255),
    email_id varchar(255)
);

ALTER TABLE dnsmapping add primary key (ip_address);

SET SQL_SAFE_UPDATES = 0;

delete from dnsmapping where ip_address = null;

ALTER TABLE dnsmapping DROP COLUMN id;

CREATE TABLE networkInfo (
    network_address int primary key,
    network_name varchar(255),
    default_gateway varchar(255),
    vlan_id varchar(255),
    city varchar(255)
    );


select * from networkInfo;

select * from network_dns_mapping;




SELECT * FROM NetworkInfo a JOIN network_dns_mapping b ON a.network_address =
b.network_address WHERE a.network_address like '%10.0.0.0%';




select * from dnsmapping where ip_address like '%90%' or domain_name like '%www.db%';

ALTER TABLE dnsmapping
MODIFY COLUMN ip_address VARCHAR(255) NOT NULL DEFAULT '127.0.0.1';
ALTER TABLE networkInfo MODIFY network_address VARCHAR(100);

CREATE TABLE network_dns_mapping (
	id int not null auto_increment,
    ip_address varchar(255),
    network_address varchar(255),
	primary key (`id`),
    constraint `fk_network_dns_mapping_ip_address` foreign key (ip_address) references dnsmapping (`ip_address`),
	constraint `fk_network_dns_mapping_network_info` foreign key (network_address) references networkInfo (`network_address`)
);




select * from dnsmapping;
delete from dnsmapping where domain_name = 'www.db-bits.com';






SELECT * FROM NetworkInfo a JOIN network_dns_mapping b ON a.network_address =
b.network_address WHERE a.network_address = '10.0.0.0/26';
