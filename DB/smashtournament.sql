-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 09, 2022 at 11:17 PM
-- Server version: 8.0.28
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smashtournament`
--

-- --------------------------------------------------------

--
-- Table structure for table `combat`
--

CREATE TABLE `combat` (
  `id` int NOT NULL,
  `idUser1` int NOT NULL,
  `idChar1` int NOT NULL,
  `idUser2` int NOT NULL,
  `idChar2` int NOT NULL,
  `winner` int NOT NULL,
  `niveau` varchar(5) NOT NULL,
  `idTournoi` int NOT NULL,
  `idParent` int DEFAULT NULL,
  `bracketNo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `combat`
--

INSERT INTO `combat` (`id`, `idUser1`, `idChar1`, `idUser2`, `idChar2`, `winner`, `niveau`, `idTournoi`, `idParent`, `bracketNo`) VALUES
(1, 2, 0, 1, 0, 1, '1', 3, 6, 4),
(2, 4, 0, 3, 0, 4, '2', 3, 7, 5),
(3, 5, 0, 1, 0, 5, '2', 3, 7, 6),
(4, 4, 0, 5, 0, 5, '3', 3, NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `personnage`
--

CREATE TABLE `personnage` (
  `id` int NOT NULL,
  `nom` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `personnage`
--

INSERT INTO `personnage` (`id`, `nom`) VALUES
(1, 'Mario'),
(2, 'Fox'),
(3, 'Pikachu'),
(4, 'Luigi'),
(5, 'Donkey Kong'),
(6, 'Ness'),
(7, 'Captain Falcon'),
(8, 'Jigglypuff'),
(9, 'Daisy'),
(10, 'Samus'),
(11, 'Peach'),
(12, 'Yoshi'),
(13, 'Bowser'),
(14, 'Kirby'),
(15, 'Sheik'),
(16, 'Ice Climbers'),
(17, 'Zelda'),
(18, 'Dr. Mario'),
(19, 'Pichu'),
(20, 'Marth'),
(21, 'Link'),
(22, 'Lucina'),
(23, 'Falco'),
(24, 'Dark Samus'),
(25, 'Young Link'),
(26, 'Ganondorf'),
(27, 'Mewtwo'),
(28, 'Meta Knight'),
(29, 'Roy'),
(30, 'Mr. Game & Watch'),
(31, 'Chrom'),
(32, 'Pit'),
(33, 'Dark Pit'),
(34, 'Snake'),
(35, 'Wario'),
(36, 'Ike'),
(37, 'Zero Suit Samus'),
(38, 'Pokémon Trainer'),
(39, 'Diddy Kong'),
(40, 'Lucario'),
(41, 'Olimar'),
(42, 'King Dedede'),
(43, 'Lucas'),
(44, 'Sonic'),
(45, 'R.O.B.'),
(46, 'Toon Link'),
(47, 'Villager'),
(48, 'Wolf'),
(49, 'Wii Fit Trainer'),
(50, 'Rosalina & Luma'),
(51, 'Mega Man'),
(52, 'Little Mac'),
(53, 'Mii Gunner'),
(54, 'Mii Brawler'),
(55, 'Mii Swordfighter'),
(56, 'Palutena'),
(57, 'Greninja'),
(58, 'Pac-Man'),
(59, 'Robin'),
(60, 'Shulk'),
(61, 'Ryu'),
(62, 'Duck Hunt'),
(63, 'Bowser Jr.'),
(64, 'Ken'),
(65, 'Richter'),
(66, 'Simon'),
(67, 'Cloud'),
(68, 'Ridley'),
(69, 'Bayonetta'),
(70, 'King K. Rool'),
(71, 'Isabelle'),
(72, 'Incineroar'),
(73, 'Piranha Plant'),
(74, 'Joker'),
(75, 'Hero'),
(76, 'Banjo & Kazooie'),
(77, 'Terry'),
(78, 'Byleth'),
(79, 'Min Min');

-- --------------------------------------------------------

--
-- Table structure for table `tournoi`
--

CREATE TABLE `tournoi` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `etat` varchar(20) NOT NULL,
  `nbParticipants` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tournoi`
--

INSERT INTO `tournoi` (`id`, `date`, `etat`, `nbParticipants`) VALUES
(3, '2022-03-09', 'terminé', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `photo` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `photo`) VALUES
(1, 'jim', 'jim.jpg'),
(2, 'alexmask', 'alexmask.jpeg'),
(3, 'oui', 'Test.png'),
(4, 'non', 'Test.png'),
(5, 'jean', 'Test.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `combat`
--
ALTER TABLE `combat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personnage`
--
ALTER TABLE `personnage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournoi`
--
ALTER TABLE `tournoi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `combat`
--
ALTER TABLE `combat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personnage`
--
ALTER TABLE `personnage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `tournoi`
--
ALTER TABLE `tournoi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
