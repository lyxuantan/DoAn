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
INSERT INTO `category` VALUES (50,0,'NAM LYX XUÂN TẤN','TAnn','',NULL,NULL,'2022-09-09 05:01:45','2022-07-03 15:25:20',1),(51,50,'ĐỒNG HỒ','dddđ','bán chạy nhất',NULL,NULL,'2022-10-11 17:00:00','2022-07-03 15:25:20',0),(52,0,'NỮ GIỚI','WOME\'S TAN','Tom B. Erichsen','Cardinal',NULL,'2022-06-05 09:50:49','2022-07-03 10:06:47',0),(53,50,'PHỤ KIỆN',NULL,'',NULL,NULL,'2022-06-06 07:58:53','2022-07-02 16:32:47',0),(54,52,'ĐỒNG HỒ NỮ','a','a','a','a','2022-07-01 17:51:10','2022-07-03 02:53:40',0),(55,52,'PHỤ KIỆN NỮ','4','4','4','4','2022-07-01 18:15:08','2022-07-03 02:53:40',0);
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
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Bang config thong tin tren web';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'logo','oiroiorieorwwe.png','Day la Logo'),(2,'logo','logo2.png','Logo thu 2'),(3,'phone','02455878987','Hotline web site');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
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
  `is_paid` tinyint(1) DEFAULT NULL,
  `price_free_ship` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`,`update_time`),
  KEY `FKbd8bicw1ldfg0702iyfphs9fg` (`customer_id`),
  CONSTRAINT `FKbd8bicw1ldfg0702iyfphs9fg` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order`
--

LOCK TABLES `customer_order` WRITE;
/*!40000 ALTER TABLE `customer_order` DISABLE KEYS */;
INSERT INTO `customer_order` VALUES (1,5,10000,'2020-10-06 17:00:00','2022-06-28 17:32:57',0,NULL,NULL,NULL),(2,5,10000,'2020-10-06 17:00:00','2022-06-28 17:32:57',0,NULL,NULL,NULL),(3,5,10000,'2020-10-13 17:00:00','2022-06-29 17:11:26',0,NULL,NULL,NULL),(6,5,0,NULL,'2022-06-29 17:20:54',1,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order_detail`
--

LOCK TABLES `customer_order_detail` WRITE;
/*!40000 ALTER TABLE `customer_order_detail` DISABLE KEYS */;
INSERT INTO `customer_order_detail` VALUES (1,1,4500000,1,4500000,'2020-10-06 17:00:00','2020-10-07 11:33:47',0,NULL,NULL,NULL),(2,2,4500000,1,4500000,'2020-10-06 17:00:00','2020-10-07 12:06:29',0,NULL,NULL,NULL),(3,3,4500000,1,4500000,'2020-10-13 17:00:00','2020-10-14 12:24:18',0,NULL,NULL,NULL),(4,3,40000,2,0,NULL,'2022-06-29 17:08:52',NULL,0,6,NULL),(5,6,40000,2,69,NULL,'2022-06-30 17:35:09',NULL,0,6,2),(6,6,4000000,200,0,'2022-06-29 17:53:13','2022-06-29 17:53:13',NULL,0,6,NULL),(7,6,40000,2,0,'2022-07-03 05:15:37','2022-07-03 05:15:37',NULL,0,6,0);
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
INSERT INTO `list_color` VALUES (1,NULL,NULL,'Xanh',NULL),(2,NULL,NULL,'Vàng',NULL);
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_size`
--

LOCK TABLES `list_size` WRITE;
/*!40000 ALTER TABLE `list_size` DISABLE KEYS */;
INSERT INTO `list_size` VALUES (1,NULL,NULL,'38mm');
/*!40000 ALTER TABLE `list_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `href` varchar(255) DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `school_id` int DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT '',
  `desc` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `content` longtext,
  `alias` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT '0',
  `status` int DEFAULT NULL,
  `order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` VALUES (28,1,'Thông báo lịch nghỉ ngày Giỗ tổ Hùng Vương','Thong bao toan truong',NULL,NULL,NULL,NULL,NULL,1,1,0,'2019-02-19 00:28:09','2019-02-19 00:55:19'),(29,1,'Thông báo lịch nghỉ 30/4 và quốc tế lao động','Thong bao toan truong',NULL,NULL,NULL,NULL,NULL,1,1,0,'2019-02-19 00:28:09','2019-02-19 00:55:39'),(30,1,'Thông báo về việc đóng học phí kỳ 2 lớp 3 tuổi (3A1)','Thong bao toan truong',NULL,NULL,NULL,NULL,NULL,1,1,0,'2019-02-19 00:28:09','2019-02-19 00:55:53');
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_image`
--

DROP TABLE IF EXISTS `page_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_image` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int unsigned DEFAULT '0',
  `file_name` varchar(255) DEFAULT '',
  `is_featured` int unsigned DEFAULT '0',
  `is_slideshow` int unsigned DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `page_id_index` (`page_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_image`
--

LOCK TABLES `page_image` WRITE;
/*!40000 ALTER TABLE `page_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cate` int DEFAULT '0',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `status` tinyint DEFAULT '0',
  `create_time` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (14,2,'hanoi','fdfdf','We\'ll never share your email with anyone else.',NULL,NULL,0,NULL),(15,1,'Hot tháng 8','su kiệntháng 8','',NULL,'<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',1,NULL),(16,1,'Hot tháng 8','fdfdf','',NULL,'<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',0,NULL);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
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
  `sale_number` bigint DEFAULT NULL,
  `total` bigint DEFAULT NULL,
  `root_parent_category` bigint DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (6,51,'fjkdfd','fdfdsfd','',30000,20000,'',NULL,'2022-09-19 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,51,'fjkdfd','fdfdsfd','',30000,20000,NULL,NULL,'2022-09-19 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,51,'fjkdfd','fdfdsfd','',30000,20000,'',NULL,'2022-09-19 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,51,'hanoi','su kiệntháng 8','',5000000,4500000,'<p>Noi dung san pham</p>',NULL,'2022-09-22 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,100,NULL,NULL),(10,51,'Hot tháng 8','su kiệntháng 8','Oh, those tricky Java 8 streams with lambdas. They are very powerful, yet the intricacies take a bit to wrap one\'s header around it all.',5000000,4500000,'<p>Noi dung mopi</p>',NULL,'2022-09-26 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL),(11,51,'Ly Xuan Tan','TLA','BAN',10000,100000,'',NULL,'2022-10-13 17:00:00','2022-07-03 15:25:04',1,NULL,NULL,NULL,NULL,NULL,4,NULL,54),(12,54,'Tan',NULL,'desc',1000,NULL,'content',NULL,'2022-06-18 16:41:49','2022-07-03 08:23:56',NULL,15,NULL,NULL,NULL,NULL,4656,NULL,52),(13,54,'Tan',NULL,'desc',1000,500000,'content',NULL,'2022-06-18 16:42:41','2022-07-03 08:23:56',NULL,15,NULL,NULL,NULL,NULL,5656,NULL,52),(14,0,'ẻ',NULL,'desc',1000,4000000,'content',NULL,'2022-06-18 16:54:09','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,56,NULL,NULL),(15,0,'Tan an khong',NULL,'desc',1000,4000000,'content',NULL,'2022-06-18 16:58:45','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL),(16,0,'viettel_7/3_1',NULL,'desc',1000,24354,'content',NULL,'2022-06-18 17:08:29','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL),(17,0,'ⓈốⓃⒼⒸⒽấⓉVVV',NULL,'desc',1000,454,'content',NULL,'2022-06-18 17:09:16','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,6,NULL,NULL),(18,NULL,'Tan dang cap',NULL,'desc',1000,55,'content',NULL,'2022-06-18 17:12:46','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,899,NULL,NULL),(19,50,'Tan nam',NULL,'desc',1000,7666.67,'content',NULL,'2022-06-29 17:32:20','2022-07-03 14:21:36',NULL,-15,1,NULL,1,1,999,NULL,NULL),(20,50,'Tan nam 2',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:35:22','2022-07-03 12:19:16',NULL,15,1,NULL,1,1,9,100,NULL),(21,50,'Tan',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:39:15','2022-07-03 08:23:56',NULL,15,1,NULL,1,1,99,100,NULL),(22,50,'Tan',NULL,'desc',1000,1000,'content',NULL,'2022-06-29 17:40:08','2022-07-03 14:21:36',NULL,20,1,NULL,1,1,50000,100,NULL),(23,50,'Tan',NULL,'desc',1004540,1004540,'content',NULL,'2022-06-29 17:40:26','2022-07-03 14:21:36',NULL,20,1,NULL,1,1,898,100,NULL),(24,50,'Tan',NULL,'desc',1004540,1004540,'content',NULL,'2022-06-29 17:41:05','2022-07-03 08:23:56',NULL,20,1,NULL,1,1,78989,100,NULL),(25,50,'Tan',NULL,'desc',1004540,0,'content',NULL,'2022-06-29 17:41:44','2022-07-03 08:23:56',NULL,20,1,NULL,1,1,898989,100,NULL),(26,50,'Tan',NULL,'desc',1004540,1205450,'content',NULL,'2022-06-29 17:42:50','2022-07-03 13:58:10',NULL,-20,1,NULL,1,1,89809,100,NULL),(27,50,'Nguyễn Thế Dũng',NULL,'desc',1004540,1205450,'content',NULL,'2022-07-03 14:19:59','2022-07-03 14:19:59',NULL,20,1,NULL,1,1,NULL,100,NULL),(28,50,'Nguyễn Thế Dũng',NULL,'desc',100,80,'content',NULL,'2022-07-03 14:20:26','2022-07-03 14:21:36',NULL,-20,1,NULL,1,1,10000000,100,NULL);
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (2,'2022-06-19','/uploads/doc/2022/6/img_0002-4-30NnU8Z5iV.JPEG',1,0,16,'IMG_0002 (4).JPEG',NULL,NULL),(3,NULL,NULL,1,NULL,NULL,'pdf',NULL,NULL),(4,NULL,NULL,1,NULL,15,'pdf',NULL,NULL),(5,'2022-06-19','/uploads/doc/2022/6/img_0002-4-Q0TtA0ZBVn.JPEG',1,NULL,15,'IMG_0002 (4).JPEG',NULL,NULL),(6,'2022-06-19','/uploads/doc/2022/6/img_0002-4-1KzT5nNv4S.JPEG',1,NULL,15,'IMG_0002 (4).JPEG',NULL,NULL),(7,'2022-06-20','/uploads/doc/2022/6/img_0002-RqEvOUrlXa.JPEG',1,NULL,15,'IMG_0002.JPEG',NULL,NULL),(8,'2022-07-03','/uploads/doc/2022/7/data-export-2-LqU4cfG5b0.png',1,NULL,19,'data-export (2).png',NULL,NULL),(9,'2022-07-03','/uploads/doc/2022/7/2-1IyiQDXHOr.jpg',1,NULL,19,'2.jpg',NULL,NULL);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `star` decimal(4,2) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `content` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
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
-- Table structure for table `spring_session`
--

DROP TABLE IF EXISTS `spring_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spring_session` (
  `PRIMARY_ID` char(36) NOT NULL,
  `SESSION_ID` char(36) NOT NULL,
  `CREATION_TIME` bigint NOT NULL,
  `LAST_ACCESS_TIME` bigint NOT NULL,
  `MAX_INACTIVE_INTERVAL` int NOT NULL,
  `EXPIRY_TIME` bigint NOT NULL,
  `PRINCIPAL_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PRIMARY_ID`),
  UNIQUE KEY `SPRING_SESSION_IX1` (`SESSION_ID`),
  KEY `SPRING_SESSION_IX2` (`EXPIRY_TIME`),
  KEY `SPRING_SESSION_IX3` (`PRINCIPAL_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spring_session`
--

LOCK TABLES `spring_session` WRITE;
/*!40000 ALTER TABLE `spring_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `spring_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spring_session_attributes`
--

DROP TABLE IF EXISTS `spring_session_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spring_session_attributes` (
  `SESSION_PRIMARY_ID` char(36) NOT NULL,
  `ATTRIBUTE_NAME` varchar(200) NOT NULL,
  `ATTRIBUTE_BYTES` blob NOT NULL,
  PRIMARY KEY (`SESSION_PRIMARY_ID`,`ATTRIBUTE_NAME`),
  CONSTRAINT `SPRING_SESSION_ATTRIBUTES_FK` FOREIGN KEY (`SESSION_PRIMARY_ID`) REFERENCES `spring_session` (`PRIMARY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spring_session_attributes`
--

LOCK TABLES `spring_session_attributes` WRITE;
/*!40000 ALTER TABLE `spring_session_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `spring_session_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `exprirydate` datetime DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `expriry_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permision`
--

DROP TABLE IF EXISTS `user_permision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permision` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` varchar(100) NOT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'hasRole(''USER'')',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permision`
--

LOCK TABLES `user_permision` WRITE;
/*!40000 ALTER TABLE `user_permision` DISABLE KEYS */;
INSERT INTO `user_permision` VALUES (3,'/admin/**','hasRole(\'ADMIN\')'),(6,'/admin/banner/**','hasRole(\'ADMIN\') or hasRole(\'DBA\')'),(7,'/admin/page/**','hasRole(\'ADMIN\') or hasRole(\'DBA\')'),(8,'/admin/block-home/**','hasRole(\'ADMIN\') or hasRole(\'DBA\')'),(9,'/admin/config/**','hasRole(\'ADMIN\') or hasRole(\'DBA\')'),(10,'/admin/menu/**','any'),(11,'/admin/add-user','hasRole(\'ADMIN\')'),(12,'/admin/delete-user-*','hasRole(\'ADMIN\')'),(13,'/admin/edit-user-*','hasRole(\'ADMIN\')'),(14,'/product/create','hasRole(\'ADMIN\') or hasRole(\'DBA\')');
/*!40000 ALTER TABLE `user_permision` ENABLE KEYS */;
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
INSERT INTO `user_roles` VALUES (5,2),(6,2);
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
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sso_id` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'lyxuantan','$2a$10$u5upuEzU96a5kUH3JYO6le/AAotBWOvZP9vZb/YPAqiVdNKTn4aLC','Lý Xuân Tấn','lyxuantan1999@gmail.com',0,'04545454','Hà Nội',NULL,NULL,NULL,NULL),(6,'nguyenthedung','$2a$10$BNMGCAnfQcj6edcUGXYyW.b0M4CWLiC/4AFk3Q6A3u9zVwe274/QG','Lý Xuân Tấn','nguyenthedung@gmail.com',0,'04545454','Hà Nội',NULL,NULL,'2022-07-03 21:31:48','2022-07-03 21:31:48');
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

-- Dump completed on 2022-07-03 22:27:20
