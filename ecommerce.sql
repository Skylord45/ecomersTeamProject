-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 192.168.22.127    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.20.04.1

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
-- Table structure for table `admin_table`
--

DROP TABLE IF EXISTS `admin_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_table` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_table`
--

LOCK TABLES `admin_table` WRITE;
/*!40000 ALTER TABLE `admin_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_table`
--

DROP TABLE IF EXISTS `bill_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_table` (
  `bill_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `order_id` int NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vendor_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `bill_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `bill_table_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `bill_table_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_details` (`vendor_id`),
  CONSTRAINT `bill_table_ibfk_4` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_table`
--

LOCK TABLES `bill_table` WRITE;
/*!40000 ALTER TABLE `bill_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cat_id` int NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `parent_cat_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cat_id`),
  KEY `parent_cat_id` (`parent_cat_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_cat_id`) REFERENCES `categories` (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers_details`
--

DROP TABLE IF EXISTS `offers_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers_details` (
  `offer_id` int NOT NULL AUTO_INCREMENT,
  `offer_name` varchar(45) NOT NULL,
  `offer_start_date` varchar(45) NOT NULL,
  `offer_end_date` varchar(45) NOT NULL,
  `is_expired` tinyint(1) NOT NULL,
  `offer_updated_at` timestamp NOT NULL,
  `offer_created_at` varchar(255) NOT NULL,
  PRIMARY KEY (`offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers_details`
--

LOCK TABLES `offers_details` WRITE;
/*!40000 ALTER TABLE `offers_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `offers_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `address_id` int NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` varchar(255) NOT NULL DEFAULT 'pending',
  `product_price` varchar(255) NOT NULL,
  `delivery_date` date NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_details` (`vendor_id`),
  CONSTRAINT `order_details_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `user_address_table` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_table`
--

DROP TABLE IF EXISTS `payment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_table` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `payment_type` varchar(45) NOT NULL,
  `payment_at` timestamp NOT NULL,
  `payment_is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_table_1_idx` (`order_id`),
  KEY `fk_payment_table_2_idx` (`user_id`),
  CONSTRAINT `fk_payment_table_1` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`order_id`),
  CONSTRAINT `fk_payment_table_2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_table`
--

LOCK TABLES `payment_table` WRITE;
/*!40000 ALTER TABLE `payment_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `vendor_product_id` int NOT NULL,
  `price` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_sold` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  KEY `vendor_product_id` (`vendor_product_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_product_id`) REFERENCES `vendor_product_details` (`vendor_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund_details`
--

DROP TABLE IF EXISTS `refund_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund_details` (
  `refund_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `requested_at` timestamp NOT NULL,
  `accepted_at` varchar(45) NOT NULL,
  `refund_status` varchar(45) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`refund_id`),
  KEY `fk_refund_details_1_idx` (`user_id`),
  KEY `fk_refund_details_2_idx` (`order_id`),
  CONSTRAINT `fk_refund_details_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `fk_refund_details_2` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund_details`
--

LOCK TABLES `refund_details` WRITE;
/*!40000 ALTER TABLE `refund_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `refund_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_table`
--

DROP TABLE IF EXISTS `review_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_table` (
  `review_id` int NOT NULL,
  `order_id` int NOT NULL,
  `vendor_product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `review_rating` int NOT NULL,
  `review_text` varchar(255) NOT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  KEY `user_id` (`user_id`),
  KEY `vendor_product_id` (`vendor_product_id`),
  CONSTRAINT `review_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `review_table_ibfk_2` FOREIGN KEY (`vendor_product_id`) REFERENCES `vendor_product_details` (`vendor_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_table`
--

LOCK TABLES `review_table` WRITE;
/*!40000 ALTER TABLE `review_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment_details`
--

DROP TABLE IF EXISTS `shipment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment_details` (
  `shipment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `shipment_status` varchar(45) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL,
  PRIMARY KEY (`shipment_id`),
  KEY `fk_shipment_details_1_idx` (`user_id`),
  KEY `fk_shipment_details_2_idx` (`order_id`),
  CONSTRAINT `fk_shipment_details_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `fk_shipment_details_2` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment_details`
--

LOCK TABLES `shipment_details` WRITE;
/*!40000 ALTER TABLE `shipment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address_table`
--

DROP TABLE IF EXISTS `user_address_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address_table` (
  `address_id` int NOT NULL,
  `user_id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `pin_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address_table`
--

LOCK TABLES `user_address_table` WRITE;
/*!40000 ALTER TABLE `user_address_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_address_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_details`
--

DROP TABLE IF EXISTS `vendor_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_details` (
  `vendor_id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `gst_number` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `pincode` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `gst_number` (`gst_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_details`
--

LOCK TABLES `vendor_details` WRITE;
/*!40000 ALTER TABLE `vendor_details` DISABLE KEYS */;
INSERT INTO `vendor_details` VALUES (1,'jkl','Mehta','jkl@gmail.com','9856321472','jkl','369852',1,'2025-03-18 05:51:25','2025-03-25 15:54:32',1,0,'364001','Bhavnagar','Gujarat'),(2,'abc','Mehta','abc@gmail.com','9745863214','abc','741258',1,'2025-03-12 06:04:45','2025-03-13 17:08:46',1,0,'364001','Bhavnagar','Gujarat'),(3,'def','Mehta','def@gmail.com','9658741234','def','258741',1,'2025-03-17 04:28:47','2025-03-17 10:00:13',1,0,'364001','Bhavnagar','Gujarat'),(4,'wer','Patel','wer@gmail.com','9568741234','wer','258963',1,'2025-03-17 13:24:44','2025-03-18 10:19:32',1,0,'364002','Ahmedabad','Gujarat'),(5,'xyz','Patel','xyz@gmail.com','9658741234','xyz','854712',1,'2025-03-18 05:37:54','2025-03-18 11:08:41',1,0,'364002','Ahmedabad','Gujarat');
/*!40000 ALTER TABLE `vendor_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_product_details`
--

DROP TABLE IF EXISTS `vendor_product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_product_details` (
  `vendor_product_id` int NOT NULL,
  `category_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `stock` int NOT NULL,
  `price` int NOT NULL,
  `available_stock` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vendor_product_id`),
  KEY `category_id` (`category_id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `vendor_product_details_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`cat_id`),
  CONSTRAINT `vendor_product_details_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_details` (`vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_product_details`
--

LOCK TABLES `vendor_product_details` WRITE;
/*!40000 ALTER TABLE `vendor_product_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_stock_history`
--

DROP TABLE IF EXISTS `vendor_stock_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_stock_history` (
  `vendor_stock_history_id` int NOT NULL,
  `vendor_product_id` int NOT NULL,
  `total_previous_stock` int NOT NULL,
  `total_available_stock` int NOT NULL,
  `added_stock` int NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vendor_stock_history_id`),
  KEY `vendor_product_id` (`vendor_product_id`),
  CONSTRAINT `vendor_stock_history_ibfk_1` FOREIGN KEY (`vendor_product_id`) REFERENCES `vendor_product_details` (`vendor_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_stock_history`
--

LOCK TABLES `vendor_stock_history` WRITE;
/*!40000 ALTER TABLE `vendor_stock_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_stock_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_table`
--

DROP TABLE IF EXISTS `wishlist_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_table` (
  `wishlist_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wishlist_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `wishlist_table_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_table`
--

LOCK TABLES `wishlist_table` WRITE;
/*!40000 ALTER TABLE `wishlist_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-01 11:46:50
