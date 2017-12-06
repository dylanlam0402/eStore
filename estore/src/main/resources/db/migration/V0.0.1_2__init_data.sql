-- password: Admin@123

INSERT INTO store(store_code,`name`,address,phone,activated)
VALUES ('STORE01','ATT Shop','123 abc q11 ','081236435',true);
INSERT INTO store(store_code,`name`,address,phone,activated)
VALUES ('STORE02','BCTT Shop','134 def q12 ','9345432',true);

INSERT INTO users(username, password, email, first_name, last_name, language_tag, activated, role, store_id, created_at, created_by)
  VALUES ('admin', '$2a$10$NiK.3NQeblayPGlcmHM70uOBoBGeRxC8xa86XydNTHREjO5WTc5uC', 'trungnguyen@kms-technology.com',
          'Administrator', 'User', 'en', true, 'ADMIN',1, now(), 'SYSTEM');
INSERT INTO users(username, password, email, first_name, last_name, language_tag, activated, role,store_id, created_at, created_by)
  VALUES ('user', '$2y$10$BJAkVOswMSSLQNmOsA3WG.lN1V2Ndd5RADgH5s7izAhhAiz5waPDK', 'kietlam@kms-technology.com',
          'Administrator', 'User', 'en', true, 'USER',2, now(), 'SYSTEM');
INSERT INTO item_types(`name`, description, activated )
VALUES  ('Phone', 'phone type', true);
INSERT INTO item_types(`name`, description, activated )
VALUES  ('Tablet', 'tablet type', true);
INSERT INTO uoms(`name`, unit_amount)
VALUES ('Each', 1);
INSERT INTO uoms(`name`, unit_amount)
VALUES ('Package', 1);

INSERT INTO  items(`name`,quantity,price,store_id,uoms_id,item_types_id,activated,item_code,ranking,`size`)
VALUES ('Galaxy S7', 12,1200000,1,1,1,true,'SS01',0,0);