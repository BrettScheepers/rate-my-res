CREATE TABLE universities (
    uni_id varchar(10),
    uni_name varchar(150) not null,
    uni_slug varchar(150) not null PRIMARY KEY
);

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('uwc','University Of The Western Cape','university-of-the-western-cape');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('uct','University Of Cape Town','university-of-cape-town');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('up','University Of Pretoria','university-of-pretoria');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('wits','University Of The Witwatersrand','university-of-the-witwatersrand');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('stell','Stellenbosch University','stellenbosch-university');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('ukzn','University Of KwaZulu-Natal','university-of-kwazulu-natal');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('rhodes','Rhodes University','rhodes-university');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('unisa','University Of South Africa','university-of-south-africa');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('ufs','University Of The Free State','university-of-the-free-state');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('nmu','Nelson Mandela University','nelson-mandela-university');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('dut','Durban University Of Technology','durban-university-of-technology');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('uj','University Of Johannesburg','university-of-johannesburg');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('nwu','North-West University','north-west-university');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('ufh','University Of Fort Hare','university-of-fort-hare');

INSERT INTO universities(uni_id, uni_name, uni_slug) VALUES
('cput','Cape Peninsula University Of Technology','cape-peninsula-university-of-technology');

CREATE TABLE residences (
    res_slug varchar(150) PRIMARY KEY,
    res_name varchar(150) not null,
    uni_slug varchar(150) not null,
    is_reviewed boolean not null,
    date_created date not null DEFAULT CURRENT_DATE,
    CONSTRAINT fk_universities
        FOREIGN KEY(uni_slug) 
        REFERENCES universities(uni_slug)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    res_slug varchar(150) not null,
    room_rating smallint not null,
    building_rating smallint not null,
    bathroom_rating smallint not null,
    location_rating smallint not null,
    class_year varchar(20) not null,
    calender_year int not null,
    room_type varchar(20) not null,
    recommend boolean not null,
    amenities text not null,
    comment varchar(300) not null,
    is_reviewed boolean not null,
    date_created date not null DEFAULT CURRENT_DATE,
    CONSTRAINT fk_res
        FOREIGN KEY(res_slug) 
        REFERENCES residences(res_slug)
        ON DELETE CASCADE
);