-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: spring_ecommer
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) NOT NULL,
  `content` text,
  `icon` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (50,0,'NAM LYX XUÂN TẤN','TAnn','',NULL,NULL,'2022-09-09 05:01:45','2022-07-03 15:25:20',1),(51,50,'ĐỒNG HỒ','ĐỒNG HỒ NAM','Sự tự tin trên cổ tay của người đàn ông hiện đạ',NULL,NULL,'2022-10-11 17:00:00','2022-07-10 03:40:50',0),(52,0,'NỮ GIỚI','WOME\'S TAN','Tom B. Erichsen','Cardinal',NULL,'2022-06-05 09:50:49','2022-07-03 10:06:47',0),(53,50,'PHỤ KIỆN',NULL,'',NULL,NULL,'2022-06-06 07:58:53','2022-07-02 16:32:47',0),(54,52,'ĐỒNG HỒ NỮ','a','a','a','a','2022-07-01 17:51:10','2022-07-03 02:53:40',0),(55,52,'PHỤ KIỆN NỮ','4','4','4','4','2022-07-01 18:15:08','2022-07-03 02:53:40',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_collection`
--

DROP TABLE IF EXISTS `category_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_collection` (
  `category_id` bigint DEFAULT NULL,
  `collection_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_collection`
--

LOCK TABLES `category_collection` WRITE;
/*!40000 ALTER TABLE `category_collection` DISABLE KEYS */;
INSERT INTO `category_collection` VALUES (51,1);
/*!40000 ALTER TABLE `category_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_image`
--

DROP TABLE IF EXISTS `collection_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_image` (
  `id` bigint NOT NULL,
  `name` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` blob,
  `file` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_image`
--

LOCK TABLES `collection_image` WRITE;
/*!40000 ALTER TABLE `collection_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmation_token`
--

DROP TABLE IF EXISTS `confirmation_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmation_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` timestamp NULL DEFAULT NULL,
  `expiry_date` timestamp NULL DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `confirmation_token` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token`
--

LOCK TABLES `confirmation_token` WRITE;
/*!40000 ALTER TABLE `confirmation_token` DISABLE KEYS */;
INSERT INTO `confirmation_token` VALUES (1,'2022-07-24 06:26:34','2022-07-24 06:36:34',5,'a89330a6-c540-4b93-a90d-f85fe15bf4f5'),(2,'2022-07-24 06:29:49','2022-07-24 06:39:49',5,'f314e6db-9359-4067-a10e-99e7cef805e0'),(3,'2022-07-24 06:38:00','2022-07-24 06:48:00',5,'445eb370-31d4-402b-a95b-e49640aa42d4'),(4,'2022-07-24 07:05:03','2022-07-24 07:15:03',5,'7588a0c9-15dc-49f4-b6e8-31102d9bb1e3'),(5,'2022-07-24 09:15:13','2022-07-24 09:25:13',6,'b7b34fdc-fd9b-4659-93a6-da2f82a8c217'),(6,'2022-07-24 09:17:49','2022-07-24 09:27:49',6,'13ab27de-52a8-4d7b-a812-851e186e39b3');
/*!40000 ALTER TABLE `confirmation_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint DEFAULT '0',
  `shipping_cost` float DEFAULT '0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `is_paid` tinyint(1) DEFAULT '1',
  `price_free_ship` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`,`update_time`),
  KEY `FKbd8bicw1ldfg0702iyfphs9fg` (`customer_id`),
  CONSTRAINT `FKbd8bicw1ldfg0702iyfphs9fg` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order`
--

LOCK TABLES `customer_order` WRITE;
/*!40000 ALTER TABLE `customer_order` DISABLE KEYS */;
INSERT INTO `customer_order` VALUES (32,6,0,'2022-07-31 10:45:04','2022-07-31 12:32:46',0,1,NULL,0),(33,6,0,'2022-07-31 10:47:27','2022-07-31 12:32:46',0,1,NULL,1205450),(34,6,0,'2022-07-31 10:54:08','2022-07-31 12:32:46',0,1,NULL,1205530),(35,6,0,'2022-07-31 12:34:43','2022-07-31 12:34:57',0,1,NULL,0),(36,6,0,'2022-07-31 13:47:09','2022-07-31 13:55:51',0,1,NULL,1205450),(37,6,0,'2022-07-31 13:56:00','2022-07-31 13:56:06',0,1,NULL,0),(38,6,0,'2022-07-31 13:56:28','2022-07-31 13:56:38',0,1,NULL,18000000),(39,6,0,'2022-07-31 13:57:03','2022-07-31 13:57:10',0,1,NULL,0),(40,6,0,'2022-07-31 14:43:09','2022-07-31 15:42:41',NULL,0,NULL,97641500),(41,14,0,'2022-07-31 16:24:30','2022-07-31 16:24:34',0,0,NULL,0);
/*!40000 ALTER TABLE `customer_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_order_detail`
--

DROP TABLE IF EXISTS `customer_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `quantity` bigint DEFAULT '0',
  `total` bigint DEFAULT '0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `price_initial` float DEFAULT '0',
  `product_id` bigint DEFAULT NULL,
  `price_ref` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2v1uragrp9nqnpduhvqqtakdq` (`order_id`),
  KEY `FKejbnto28443m72cwaqg94e9p4` (`product_id`),
  CONSTRAINT `FK2v1uragrp9nqnpduhvqqtakdq` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`id`),
  CONSTRAINT `FKejbnto28443m72cwaqg94e9p4` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order_detail`
--

LOCK TABLES `customer_order_detail` WRITE;
/*!40000 ALTER TABLE `customer_order_detail` DISABLE KEYS */;
INSERT INTO `customer_order_detail` VALUES (250,32,0,1,0,'2022-07-31 10:45:04','2022-07-31 10:45:04',NULL,0,25,1004540),(251,34,0,1,0,'2022-07-31 10:47:27','2022-07-31 10:54:43',NULL,0,25,1004540),(252,34,1205450,1,0,'2022-07-31 10:48:58','2022-07-31 10:54:43',NULL,0,26,1004540),(253,34,0,1,0,'2022-07-31 10:54:08','2022-07-31 10:54:08',NULL,0,25,1004540),(254,33,80,1,0,'2022-07-31 10:54:43','2022-07-31 10:54:43',NULL,0,28,100),(255,33,80,1,0,'2022-07-31 10:55:24','2022-07-31 10:55:24',NULL,0,28,100),(256,34,80,1,0,'2022-07-31 10:55:49','2022-07-31 10:55:49',NULL,0,28,100),(257,34,1205450,1,0,'2022-07-31 10:55:57','2022-07-31 10:55:57',NULL,0,24,1004540),(258,35,0,1,0,'2022-07-31 12:34:43','2022-07-31 12:34:43',NULL,0,25,1004540),(259,35,1205450,1,0,'2022-07-31 12:34:52','2022-07-31 12:34:52',NULL,0,26,1004540),(260,36,1205450,1,0,'2022-07-31 13:47:09','2022-07-31 13:47:09',NULL,0,26,1004540),(261,36,1205450,1,0,'2022-07-31 13:47:10','2022-07-31 13:47:10',NULL,0,27,1004540),(262,37,0,1,0,'2022-07-31 13:56:00','2022-07-31 13:56:00',NULL,0,32,0),(263,38,3000000,6,0,'2022-07-31 13:56:28','2022-07-31 13:56:31',NULL,0,13,6000),(264,38,1205450,1,0,'2022-07-31 13:56:34','2022-07-31 13:56:34',NULL,0,24,1004540),(265,39,0,2,0,'2022-07-31 13:57:03','2022-07-31 13:57:05',NULL,0,32,0),(266,40,0,3,0,'2022-07-31 14:43:09','2022-07-31 14:56:35',NULL,0,25,3013620),(267,40,10849000,9,0,'2022-07-31 14:48:08','2022-07-31 15:42:41',NULL,0,26,9040860),(268,40,80,1,0,'2022-07-31 14:48:59','2022-07-31 14:48:59',NULL,0,28,100),(269,40,2410900,2,0,'2022-07-31 14:49:39','2022-07-31 15:08:15',NULL,0,24,2009080),(270,41,0,1,0,'2022-07-31 16:24:30','2022-07-31 16:24:30',NULL,0,25,1004540),(271,41,1205450,1,0,'2022-07-31 16:24:34','2022-07-31 16:24:34',NULL,0,26,1004540);
/*!40000 ALTER TABLE `customer_order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_collection`
--

DROP TABLE IF EXISTS `list_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_collection` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_collection`
--

LOCK TABLES `list_collection` WRITE;
/*!40000 ALTER TABLE `list_collection` DISABLE KEYS */;
INSERT INTO `list_collection` VALUES (1,NULL,NULL,'Dây da',51);
/*!40000 ALTER TABLE `list_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_color`
--

DROP TABLE IF EXISTS `list_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_color` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_color`
--

LOCK TABLES `list_color` WRITE;
/*!40000 ALTER TABLE `list_color` DISABLE KEYS */;
INSERT INTO `list_color` VALUES (1,NULL,NULL,'Xanh','green'),(2,NULL,NULL,'Vàng','yellow');
/*!40000 ALTER TABLE `list_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_material`
--

DROP TABLE IF EXISTS `list_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_material`
--

LOCK TABLES `list_material` WRITE;
/*!40000 ALTER TABLE `list_material` DISABLE KEYS */;
INSERT INTO `list_material` VALUES (1,NULL,NULL,'Day da');
/*!40000 ALTER TABLE `list_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_size`
--

DROP TABLE IF EXISTS `list_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_size` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_size`
--

LOCK TABLES `list_size` WRITE;
/*!40000 ALTER TABLE `list_size` DISABLE KEYS */;
INSERT INTO `list_size` VALUES (1,NULL,NULL,'38mm'),(2,NULL,NULL,'43mn');
/*!40000 ALTER TABLE `list_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_history`
--

DROP TABLE IF EXISTS `order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history` (
  `customer_order_id` bigint DEFAULT NULL,
  `date` bigint DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` tinyint DEFAULT '0',
  `price` float DEFAULT '0',
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_history`
--

LOCK TABLES `order_history` WRITE;
/*!40000 ALTER TABLE `order_history` DISABLE KEYS */;
INSERT INTO `order_history` VALUES (38,1659275798304,'2022-07-31 13:56:38','2022-07-31 15:36:17',22,1,4235450,NULL),(39,1659275830074,'2022-07-31 13:57:10','2022-07-31 15:36:20',23,1,0,NULL);
/*!40000 ALTER TABLE `order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) NOT NULL,
  `price_ref` float DEFAULT '0',
  `price_sale` float DEFAULT '0',
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `per_discount` int DEFAULT NULL,
  `color_id` bigint DEFAULT NULL,
  `material_id` bigint DEFAULT NULL,
  `collection_id` float DEFAULT NULL,
  `size_id` bigint DEFAULT NULL,
  `sale_number` bigint DEFAULT '0',
  `total` bigint DEFAULT '0',
  `root_parent_category` bigint DEFAULT NULL,
  `glass_surface` varchar(500) DEFAULT NULL,
  `thinkness` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (11,51,'Ly Xuan Tan','TLA','BAN',10000,100000,'',NULL,'2022-10-13 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,4,NULL,54,NULL,NULL),(12,54,'Tan',NULL,'desc',1000,NULL,'content',NULL,'2022-06-18 16:41:49','2022-07-03 08:23:56',NULL,15,NULL,NULL,NULL,NULL,4656,NULL,52,NULL,NULL),(13,54,'Tan',NULL,'desc',1000,500000,'content',NULL,'2022-06-18 16:42:41','2022-07-31 13:56:38',NULL,15,NULL,NULL,NULL,NULL,5662,NULL,52,NULL,NULL),(14,0,'ẻ',NULL,'desc',1000,4000000,'content',NULL,'2022-06-18 16:54:09','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,56,NULL,NULL,NULL,NULL),(15,0,'Tan an khong',NULL,'desc',1000,4000000,'content',NULL,'2022-06-18 16:58:45','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL,NULL,NULL),(16,0,'viettel_7/3_1',NULL,'desc',1000,24354,'content',NULL,'2022-06-18 17:08:29','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL,NULL,NULL),(17,0,'ⓈốⓃⒼⒸⒽấⓉVVV',NULL,'desc',1000,454,'content',NULL,'2022-06-18 17:09:16','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL,NULL,NULL),(18,NULL,'Tan dang cap',NULL,'desc',1000,55,'content',NULL,'2022-06-18 17:12:46','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,899,NULL,NULL,NULL,NULL),(20,50,'Tan nam 2',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:35:22','2022-07-03 12:19:16',NULL,15,1,NULL,1,1,9,100,NULL,NULL,NULL),(21,50,'Tan',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:39:15','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,99,100,NULL,NULL,NULL),(22,50,'Tan',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:40:08','2022-07-03 14:21:36',NULL,20,1,NULL,1,1,50000,100,NULL,NULL,NULL),(23,50,'Tan',NULL,'desc',1004540,1004540,'content',NULL,'2022-06-29 17:40:26','2022-07-03 14:21:36',NULL,20,1,NULL,1,1,898,100,NULL,NULL,NULL),(24,50,'Tan',NULL,'desc',1004540,1205450,'content',NULL,'2022-06-29 17:41:05','2022-07-31 13:56:38',NULL,20,1,NULL,1,1,78999,-10,NULL,NULL,NULL),(25,50,'Tan',NULL,'desc',1004540,0,'content',NULL,'2022-06-29 17:41:44','2022-07-31 12:34:57',NULL,20,1,NULL,1,1,898992,97,NULL,NULL,NULL),(26,51,'Tan',NULL,'desc',1004540,1205450,'content',NULL,'2022-06-29 17:42:50','2022-07-31 13:55:51',NULL,-20,1,NULL,1,1,89824,-15,NULL,NULL,NULL),(27,51,'Nguyễn Thế Dũng',NULL,'desc',1004540,1205450,'content',NULL,'2022-07-03 14:19:59','2022-07-31 13:55:51',NULL,20,1,NULL,1,1,NULL,99,NULL,NULL,NULL),(28,51,'Nguyễn Thế Dũng',NULL,'desc',100,80,'content',NULL,'2022-07-03 14:20:26','2022-07-31 12:32:46',NULL,-20,1,NULL,1,1,10000001,99,NULL,NULL,NULL),(29,51,'Nguyễn Thế Dũng',NULL,'desc',100,80,'content',NULL,'2022-07-20 16:49:08','2022-07-26 01:00:07',NULL,-20,1,NULL,1,1,NULL,100,NULL,NULL,NULL),(30,51,'6',NULL,'6767',0,0,'',NULL,'2022-07-20 17:11:31','2022-07-20 17:11:31',NULL,0,2,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(31,51,'6',NULL,'6767',0,0,'',NULL,'2022-07-20 17:12:23','2022-07-20 17:12:23',NULL,0,2,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(32,54,'55',NULL,'777',0,0,'77',NULL,'2022-07-20 17:14:40','2022-07-31 13:57:10',NULL,0,NULL,NULL,NULL,NULL,NULL,-3,NULL,NULL,NULL),(34,53,'Tấn Test Save update',NULL,'abc',445,25614.2,'aee',NULL,'2022-07-20 17:16:40','2022-07-26 09:31:19',NULL,5656,2,NULL,NULL,1,NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `category_id` int NOT NULL,
  `product_id` int NOT NULL,
  KEY `FK2k3smhbruedlcrvu6clued06x` (`product_id`),
  KEY `FKkud35ls1d40wpjb5htpp14q4e` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` date DEFAULT NULL,
  `file` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_president` tinyint DEFAULT '0',
  `is_slider` tinyint DEFAULT '0',
  `product_id` bigint DEFAULT NULL,
  `name` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` blob,
  `product_imagecol` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (2,'2022-06-19','/uploads/doc/2022/6/img_0002-4-30NnU8Z5iV.JPEG',1,0,16,'IMG_0002 (4).JPEG',NULL,NULL),(3,NULL,NULL,1,NULL,NULL,'pdf',NULL,NULL),(4,NULL,NULL,1,NULL,15,'pdf',NULL,NULL),(5,'2022-06-19','/uploads/doc/2022/6/img_0002-4-Q0TtA0ZBVn.JPEG',1,NULL,15,'IMG_0002 (4).JPEG',NULL,NULL),(6,'2022-06-19','/uploads/doc/2022/6/img_0002-4-1KzT5nNv4S.JPEG',1,NULL,15,'IMG_0002 (4).JPEG',NULL,NULL),(7,'2022-06-20','/uploads/doc/2022/6/img_0002-RqEvOUrlXa.JPEG',1,NULL,15,'IMG_0002.JPEG',NULL,NULL),(8,'2022-07-03','/uploads/doc/2022/7/data-export-2-LqU4cfG5b0.png',1,NULL,19,'data-export (2).png',NULL,NULL),(9,'2022-07-03','/uploads/doc/2022/7/2-1IyiQDXHOr.jpg',1,NULL,19,'2.jpg',NULL,NULL),(10,'2022-07-23','/uploads/doc/2022/7/2-kQb8ketuiK.jpg',1,NULL,34,'2.jpg',NULL,NULL),(11,'2022-07-23','/uploads/doc/2022/7/4-vcWqBeRI9Q.jpg',1,NULL,34,'4.jpg',NULL,NULL),(16,'2022-07-23','/uploads/doc/2022/7/trangsucnam2-n0XydK1kYG.jpg',1,NULL,34,'trangsucnam2.jpg',NULL,NULL),(46,'2022-07-26','/uploads/doc/2022/7/8-5IDeKGXajD.jpg',1,NULL,34,'8.jpg',NULL,NULL),(47,'2022-07-26','/uploads/doc/2022/7/7-s07o5GfGGe.jpg',1,NULL,34,'7.jpg',NULL,NULL),(48,'2022-07-26','/uploads/doc/2022/7/7-b7oolohoLt.jpg',1,NULL,34,'7.jpg',NULL,NULL),(49,'2022-07-31','/uploads/doc/2022/7/background-P6Ttz4z58L.jpg',1,NULL,11,'background.jpg',NULL,NULL),(31,'2022-07-23','/uploads/doc/2022/7/8-k4NEXsdk5C.jpg',1,NULL,33,'8.jpg',NULL,NULL),(32,'2022-07-23','/uploads/doc/2022/7/daynam1-0BJZh32CM7.jpg',1,NULL,32,'daynam1.jpg',NULL,NULL),(33,'2022-07-23','/uploads/doc/2022/7/trangsucnam1-AiP8Zg7lgP.jpg',1,NULL,31,'trangsucnam1.jpg',NULL,NULL),(34,'2022-07-23','/uploads/doc/2022/7/7-RIhGNnuZQg.jpg',1,NULL,30,'7.jpg',NULL,NULL),(35,'2022-07-23','/uploads/doc/2022/7/3-tAh3bvQdxV.jpg',1,NULL,27,'3.jpg',NULL,NULL),(36,'2022-07-23','/uploads/doc/2022/7/daynam6-6grs22XCif.jpg',1,NULL,26,'daynam6.jpg',NULL,NULL),(37,'2022-07-23','/uploads/doc/2022/7/trangsucnam4-QEduy7jQt4.jpg',1,NULL,25,'trangsucnam4.jpg',NULL,NULL),(38,'2022-07-23','/uploads/doc/2022/7/trangsucnu5-35qgBz5PfJ.jpg',1,NULL,29,'trangsucnu5.jpg',NULL,NULL),(39,'2022-07-24','/uploads/doc/2022/7/2-HA2jh3GlGP.jpg',1,NULL,33,'2.jpg',NULL,NULL),(40,'2022-07-24','/uploads/doc/2022/7/10-USXGXL7qaB.jpg',1,NULL,30,'10.jpg',NULL,NULL),(41,'2022-07-24','/uploads/doc/2022/7/8-jduPlsVZ8W.jpg',1,NULL,30,'8.jpg',NULL,NULL),(42,'2022-07-24','/uploads/doc/2022/7/1-PhPz6b2k0Q.jpg',1,NULL,30,'1.jpg',NULL,NULL),(43,'2022-07-24','/uploads/doc/2022/7/8-k3Gkckojan.jpg',1,NULL,33,'8.jpg',NULL,NULL);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(3,'ROLE_DBA'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  KEY `FKhfh9dx7w3ubf1co1vdev94g3f` (`user_id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (6,1),(7,2),(8,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `full_name` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `status` int DEFAULT '0',
  `phone_number` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `email_verified` tinyint DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `reset_password_token` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sso_id` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'nguyenthedung','$2a$10$BNMGCAnfQcj6edcUGXYyW.b0M4CWLiC/4AFk3Q6A3u9zVwe274/QG','Lý Xuân Tấn','nguyenthedung9x@gmail.com',0,'04545454','Hà Nội',NULL,NULL,NULL,'2022-07-03 21:31:48','2022-07-03 21:31:48',NULL),(7,'tantantan1000','$2a$10$o3Lfugyg/FD6kvu5KgB.5eonCMeZfT9RMaMaAbs7Ee3P7v6EUU2Mi','Lý Xuân Tấn','lyxuantan1999@gmail.com',0,'84034918359','Tân Lập',NULL,NULL,0,'2022-07-26 23:11:32','2022-07-26 23:11:32',NULL),(8,'tantantan10000','$2a$10$oaCFCj2q4uUZBIzsaUev5Osb2NVGTDHerfFULxL8KhvkYzetTK42m','Lý Xuân Tấn0','lyxuantan1@gmail.com',0,'84034918359','Tân Lập',NULL,NULL,0,'2022-07-26 23:13:24','2022-07-26 23:13:24',NULL),(11,'132','$2a$10$HyewfMhr528GU06AHtOHBuYx7lfEnc8laNH1L6Oio4m/5WtYtE72W','Lý Xuân Tấn','4545',0,'8445565','7878',NULL,NULL,0,'2022-07-31 23:08:23','2022-07-31 23:08:23',NULL),(12,'lytan','$2a$10$MKjNWIjWy72PFWGpcIg5Bu.BSn6Crs6SkjA6cuUqwdy2FyRWw19Gm','Tân Tạo Mới','lyxuantan@gmail.com',0,'8445465','343',NULL,NULL,0,'2022-07-31 23:11:21','2022-07-31 23:11:21',NULL),(13,'123456','123456','Lý Xuân Tấn','lyxuantan13@gmail.com',0,'8445','123',NULL,NULL,0,'2022-07-31 23:17:12','2022-07-31 23:17:12',NULL),(14,'123456789','$2a$10$CP64Av97stIrpBpCVyjAyuFVRS4YrKRptA0ki3gz.Wi/wKuZY5RHu','123456789','123456789@gemvietnam.com',0,'843434','Tân Lập',NULL,NULL,0,'2022-07-31 23:23:34','2022-07-31 23:23:34',NULL),(15,'','$2a$10$lZJ7YQFwTD89s6xtULoeW.HvA4LrGwPanMS73kKlx7.jJ537XzssK','','',0,'','5656',NULL,NULL,0,'2022-07-31 23:31:04','2022-07-31 23:31:04',NULL),(16,'lyxuantan10071999','$2a$10$P6g4Rg2Aj7xqtDHwpVyls.E/rJy8./Hz2vEjb/IWDbYwvUknJGff.','Lý Xuân Tấn','tanlx1@gemvietnam.com',0,'840376224750','Tân Lập',NULL,NULL,0,'2022-07-31 23:35:21','2022-07-31 23:35:21',NULL),(17,'tantantan1999','$2a$10$v7eEL/aMyANmtstZsQ.x1eh7jolKaw1owuMQ4q1WBRReMqQScbpSS','Lý Xuân Tấn','lyxuantan123456789',0,'0376224750','Tân Lập',NULL,NULL,0,'2022-07-31 23:36:08','2022-07-31 23:36:08',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-01  9:22:16
