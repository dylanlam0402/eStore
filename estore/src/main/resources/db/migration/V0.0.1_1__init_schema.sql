create table users (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(64),
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    language_tag VARCHAR(5),
    role VARCHAR(12) NOT NULL,
    store_id BIGINT NOT NULL,
    activated BOOL,
    activation_key VARCHAR(64),
    reset_key VARCHAR(64),
    reset_at TIMESTAMP
);
create table items (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(64),
    quantity INT,
    price FLOAT ,
    store_id BIGINT NOT NULL,
    uoms_id BIGINT NOT NULL,
    item_types_id BIGINT NOT NULL,
    image_url VARCHAR(50),
    activated BOOL,
    size INT,
    color VARCHAR(20),
    discount FLOAT ,
    ranking int,
    brand VARCHAR (50),
    item_code VARCHAR (10),
    activation_key VARCHAR(64),
    reset_key VARCHAR(64),
    reset_at TIMESTAMP
);
create table item_types (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    name VARCHAR(32),
    description  VARCHAR(64),
    activated BOOL
);
create table uoms (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    name VARCHAR(32),
    unit_amount INT

);


create table `order`(
	id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    store_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    order_number INT,
    payment_id INT,
    order_date TIMESTAMP,
    ship_date TIMESTAMP,
    shipper_id BIGINT NOT NULL,
    total_price FLOAT ,
    total_qty INT
);

create table order_detail (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    items_id BIGINT NOT  NULL ,
    order_id BIGINT NOT NULL,
    qty INT,
    unit_price FLOAT,
    total_price FLOAT
);
create table store(
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    store_code VARCHAR(10),
    name VARCHAR(64),
    address VARCHAR(64),
    phone VARCHAR(11),
    activated BOOL,
    reset_at TIMESTAMP
);
create table customer (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    first_name VARCHAR (20),
    last_name VARCHAR (20),
    address VARCHAR (32),
    phone_number VARCHAR (11),
    city VARCHAR (12)
);

create table shipper (
    id BIGINT NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    created_by VARCHAR(32),
    modified_at TIMESTAMP,
    modified_by VARCHAR(32),

    name VARCHAR (30),
    ship_type VARCHAR (30),
    phone_number VARCHAR (11)
);
create view `sum_sale_item_daily` as
select items_id, sum(qty) as count from test.order_detail group by items_id