-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: diploma
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `GPGGA`
--

DROP TABLE IF EXISTS `GPGGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GPGGA` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `universal_time` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `fixed_pos_indicator` int(11) DEFAULT NULL,
  `satellite_used` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HDOP` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `altitude` float DEFAULT NULL,
  `altitude_measurement_units` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `eccentricity` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `eccentricity_measurement_units` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correction_limitation` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correction_id_control_amount` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1123 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GPGSA`
--

DROP TABLE IF EXISTS `GPGSA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GPGSA` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode_1` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mode_2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_1` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_3` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_4` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_5` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_6` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_7` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_8` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_9` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_10` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sat_used_11` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PDOP` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HDOP` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `VDOP` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `control_amount` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1123 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GPRMC`
--

DROP TABLE IF EXISTS `GPRMC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GPRMC` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `universal_time` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `ground_speed` double DEFAULT NULL,
  `movement_direction` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `magnetic_variation` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `control_amount` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-05 23:28:53
