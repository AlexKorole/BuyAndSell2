USE [master]
GO
/****** Object:  Database [BuyAndSell2]    Script Date: 14.08.2018 22:12:10 ******/
CREATE DATABASE [BuyAndSell2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BuyAndSell2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\BuyAndSell2.mdf' , SIZE = 10240KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BuyAndSell2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\BuyAndSell2_log.ldf' , SIZE = 7616KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BuyAndSell2] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BuyAndSell2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BuyAndSell2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BuyAndSell2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BuyAndSell2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BuyAndSell2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BuyAndSell2] SET ARITHABORT OFF 
GO
ALTER DATABASE [BuyAndSell2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BuyAndSell2] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [BuyAndSell2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BuyAndSell2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BuyAndSell2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BuyAndSell2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BuyAndSell2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BuyAndSell2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BuyAndSell2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BuyAndSell2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BuyAndSell2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BuyAndSell2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BuyAndSell2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BuyAndSell2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BuyAndSell2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BuyAndSell2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BuyAndSell2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BuyAndSell2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BuyAndSell2] SET RECOVERY FULL 
GO
ALTER DATABASE [BuyAndSell2] SET  MULTI_USER 
GO
ALTER DATABASE [BuyAndSell2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BuyAndSell2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BuyAndSell2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BuyAndSell2] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [BuyAndSell2]
GO
/****** Object:  StoredProcedure [dbo].[GetAdvts]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Получить список guid из таблицы
-- =============================================
CREATE PROCEDURE [dbo].[GetAdvts]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [uniqueGuid] FROM [dbo].[MainEntity]
END

GO
/****** Object:  StoredProcedure [dbo].[GetItemDetail]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	При клике на строке с объвлением, объявление раздвигается и данная проецедура возвращает дополнительную информацию
-- =============================================
CREATE PROCEDURE [dbo].[GetItemDetail]
	@guid uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [uniqueGuid]
      ,[text]
      ,[smallPhoto1]
      ,[smallPhoto2]
      ,[smallPhoto3]
      ,[smallPhoto4]
  FROM [dbo].[MainEntity] where [uniqueGuid] = @guid
END

GO
/****** Object:  StoredProcedure [dbo].[GetListOfMainEntityItemsForIniGrid]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetListOfMainEntityItemsForIniGrid]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT --[category],
      [advName]
    --  ,[text]
      ,[address]
    -- ,[phone]
    -- ,[userName]
      ,[startPrice]
      ,[minPrice]
      ,[stepDown]
      ,[periodDuration]
      ,[perTimeDown]
	  ,[priceBehavior]
     -- ,[clientIP]
      ,[createdDate]
      ,[uniqueGuid]
     -- ,[bigPhoto1]
     -- ,[bigPhoto2]
     -- ,[bigPhoto3]
     -- ,[bigPhoto4]
     -- ,[smallPhoto1]
     -- ,[smallPhoto2]
     -- ,[smallPhoto3]
     -- ,[smallPhoto4]
	 -- ,[sellerPhoto1_H]
     -- ,[sellerPhoto1_W]
     -- ,[sellerPhoto2_H]
     -- ,[sellerPhoto2_W]
     -- ,[sellerPhoto3_H]
     -- ,[sellerPhoto3_W]
     -- ,[sellerPhoto4_H]
     -- ,[sellerPhoto4_W]
  FROM [dbo].[MainEntity]
END

GO
/****** Object:  StoredProcedure [dbo].[GetMainEntityItem]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[GetMainEntityItem] 
	@guid uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [category]
      ,[advName]
      ,[text]
      ,[address]
      ,[phone]
      ,[userName]
      ,[startPrice]
      ,[minPrice]
      ,[stepDown]
      ,[periodDuration]
      ,[perTimeDown]
      ,[clientIP]
      ,[createdDate]
      ,[uniqueGuid]
      ,[bigPhoto1]
      ,[bigPhoto2]
      ,[bigPhoto3]
      ,[bigPhoto4]
      ,[smallPhoto1]
      ,[smallPhoto2]
      ,[smallPhoto3]
      ,[smallPhoto4]
	  ,[sellerPhoto1_H]
      ,[sellerPhoto1_W]
      ,[sellerPhoto2_H]
      ,[sellerPhoto2_W]
      ,[sellerPhoto3_H]
      ,[sellerPhoto3_W]
      ,[sellerPhoto4_H]
      ,[sellerPhoto4_W]
	  ,[priceBehavior]
  FROM [dbo].[MainEntity] where [uniqueGuid] = @guid
END

GO
/****** Object:  StoredProcedure [dbo].[InsertMainEntity]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertMainEntity] 
	@category nvarchar(300),
    @advName nvarchar(300),
    @text nvarchar(max),
    @address nvarchar(300),
    @phone nchar(20),
    @userName nchar(300),
    @startPrice decimal,
    @minPrice decimal,
    @stepDown decimal,
    @periodDuration decimal,
    @perTimeDown nvarchar(20),
    @clientIP nvarchar(20),
    @createdDate datetime2(7),
    @uniqueGuid uniqueidentifier,
    @bigPhoto1 ntext,
    @bigPhoto2 ntext,
    @bigPhoto3 ntext,
    @bigPhoto4 ntext,
    @smallPhoto1 ntext,
    @smallPhoto2 ntext,
    @smallPhoto3 ntext,
    @smallPhoto4 ntext,
	@sellerPhoto1_H int,
    @sellerPhoto1_W int,
    @sellerPhoto2_H int,
    @sellerPhoto2_W int,
    @sellerPhoto3_H int,
    @sellerPhoto3_W int,
    @sellerPhoto4_H int,
    @sellerPhoto4_W int,
	@priceBehavior nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[MainEntity]
           ([category]
           ,[advName]
           ,[text]
           ,[address]
           ,[phone]
           ,[userName]
           ,[startPrice]
           ,[minPrice]
           ,[stepDown]
           ,[periodDuration]
           ,[perTimeDown]
           ,[clientIP]
           ,[createdDate]
           ,[uniqueGuid]
           ,[bigPhoto1]
           ,[bigPhoto2]
           ,[bigPhoto3]
           ,[bigPhoto4]
           ,[smallPhoto1]
           ,[smallPhoto2]
           ,[smallPhoto3]
           ,[smallPhoto4]
		   ,[sellerPhoto1_H]
           ,[sellerPhoto1_W]
           ,[sellerPhoto2_H]
           ,[sellerPhoto2_W]
           ,[sellerPhoto3_H]
           ,[sellerPhoto3_W]
           ,[sellerPhoto4_H]
           ,[sellerPhoto4_W]
		   ,[priceBehavior])
     VALUES
           (@category,
			@advName,
			@text,
			@address,
			@phone,
			@userName,
			@startPrice,
			@minPrice,
			@stepDown,
			@periodDuration,
			@perTimeDown,
			@clientIP,
			@createdDate,
			@uniqueGuid,
			@bigPhoto1,
			@bigPhoto2,
			@bigPhoto3,
			@bigPhoto4,
			@smallPhoto1,
			@smallPhoto2,
			@smallPhoto3,
			@smallPhoto4,
			@sellerPhoto1_H,
			@sellerPhoto1_W,
			@sellerPhoto2_H,
			@sellerPhoto2_W,
			@sellerPhoto3_H,
		    @sellerPhoto3_W,
			@sellerPhoto4_H,
			@sellerPhoto4_W,
			@priceBehavior)
END

GO
/****** Object:  StoredProcedure [dbo].[PostBigPhoto]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Возвращает крупные фото для увеличения
-- =============================================
CREATE PROCEDURE [dbo].[PostBigPhoto]
	@guid uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

    SELECT 
      [uniqueGuid]
      ,[bigPhoto1]
      ,[bigPhoto2]
      ,[bigPhoto3]
      ,[bigPhoto4]
  FROM [dbo].[MainEntity] where [uniqueGuid] = @guid
END

GO
/****** Object:  StoredProcedure [dbo].[PostGetPhone]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Получем телефон продавца
-- =============================================
CREATE PROCEDURE [dbo].[PostGetPhone]
	@guid uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT 
      [uniqueGuid]
      ,[phone]
	FROM [dbo].[MainEntity] where [uniqueGuid] = @guid
END

GO
/****** Object:  StoredProcedure [dbo].[PostUpdatePrice]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Получает актуальную цену на товар
-- =============================================
CREATE PROCEDURE [dbo].[PostUpdatePrice]
	@guid uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
    SELECT 
       [uniqueGuid]
	  ,[createdDate]
      ,[periodDuration]
	  ,[startPrice]
	  ,[perTimeDown]
	  ,[minPrice]
	  ,[stepDown]
	  ,[priceBehavior]
  FROM [dbo].[MainEntity] where [uniqueGuid] = @guid
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateMainEntity]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateMainEntity]
	@category nvarchar(300),
    @advName nvarchar(300),
    @text nvarchar(max),
    @address nvarchar(300),
    @phone nvarchar(20),
    @userName nvarchar(300),
    @startPrice decimal(18,0),
    @minPrice decimal(18,0),
    @stepDown decimal(18,0),
    @periodDuration decimal(18,0),
    @perTimeDown nvarchar(20),
    @clientIP nvarchar(20),
    @createdDate datetime2(7),
    @uniqueGuid uniqueidentifier,
    @bigPhoto1 ntext,
    @bigPhoto2 ntext,
    @bigPhoto3 ntext,
    @bigPhoto4 ntext,
    @smallPhoto1 ntext,
    @smallPhoto2 ntext,
    @smallPhoto3 ntext,
    @smallPhoto4 ntext,
	@sellerPhoto1_H int,
    @sellerPhoto1_W int,
    @sellerPhoto2_H int,
    @sellerPhoto2_W int,
    @sellerPhoto3_H int,
    @sellerPhoto3_W int,
    @sellerPhoto4_H int,
    @sellerPhoto4_W int,
	@priceBehavior nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;

    UPDATE [dbo].[MainEntity]
   SET [category] = @category
      ,[advName] = @advName
      ,[text] = @text
      ,[address] = @address
      ,[phone] = @phone
      ,[userName] = @userName
      ,[startPrice] = @startPrice
      ,[minPrice] = @minPrice
      ,[stepDown] = @stepDown
      ,[periodDuration] = @periodDuration
      ,[perTimeDown] = @perTimeDown
      ,[clientIP] = @clientIP
      ,[createdDate] = @createdDate
      ,[bigPhoto1] = @bigPhoto1
      ,[bigPhoto2] = @bigPhoto2
      ,[bigPhoto3] = @bigPhoto3
      ,[bigPhoto4] = @bigPhoto4
      ,[smallPhoto1] = @smallPhoto1
      ,[smallPhoto2] = @smallPhoto2
      ,[smallPhoto3] = @smallPhoto3
      ,[smallPhoto4] = @smallPhoto4
	  ,[sellerPhoto1_H] = @sellerPhoto1_H
	  ,[sellerPhoto1_W] = @sellerPhoto1_W
      ,[sellerPhoto2_H] = @sellerPhoto2_H
      ,[sellerPhoto2_W] = @sellerPhoto2_W
      ,[sellerPhoto3_H] = @sellerPhoto3_H
      ,[sellerPhoto3_W] = @sellerPhoto3_W
      ,[sellerPhoto4_H] = @sellerPhoto4_H
      ,[sellerPhoto4_W] = @sellerPhoto4_W
	  ,[priceBehavior] = @priceBehavior
 WHERE [uniqueGuid] = @uniqueGuid
END

GO
/****** Object:  Table [dbo].[MainEntity]    Script Date: 14.08.2018 22:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MainEntity](
	[category] [nvarchar](300) NULL,
	[advName] [nvarchar](300) NULL,
	[text] [nvarchar](max) NULL,
	[address] [nvarchar](300) NULL,
	[phone] [nvarchar](20) NULL,
	[userName] [nvarchar](300) NULL,
	[startPrice] [decimal](18, 0) NULL,
	[minPrice] [decimal](18, 0) NULL,
	[stepDown] [decimal](18, 0) NULL,
	[periodDuration] [decimal](18, 0) NULL,
	[perTimeDown] [nvarchar](20) NULL,
	[clientIP] [nvarchar](20) NULL,
	[createdDate] [datetime2](7) NULL,
	[uniqueGuid] [uniqueidentifier] NULL,
	[bigPhoto1] [ntext] NULL,
	[bigPhoto2] [ntext] NULL,
	[bigPhoto3] [ntext] NULL,
	[bigPhoto4] [ntext] NULL,
	[smallPhoto1] [ntext] NULL,
	[smallPhoto2] [ntext] NULL,
	[smallPhoto3] [ntext] NULL,
	[smallPhoto4] [ntext] NULL,
	[sellerPhoto1_H] [int] NULL,
	[sellerPhoto1_W] [int] NULL,
	[sellerPhoto2_H] [int] NULL,
	[sellerPhoto2_W] [int] NULL,
	[sellerPhoto3_H] [int] NULL,
	[sellerPhoto3_W] [int] NULL,
	[sellerPhoto4_H] [int] NULL,
	[sellerPhoto4_W] [int] NULL,
	[priceBehavior] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода высота (seller) 1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto1_H'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода ширина (seller) 1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto1_W'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода высота (seller) 2' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto2_H'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода ширина (seller) 2' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto2_W'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода высота (seller) 3' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto3_H'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода ширина (seller) 3' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto3_W'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода высота (seller) 4' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto4_H'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'фото со сраницы ввода ширина (seller) 4' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MainEntity', @level2type=N'COLUMN',@level2name=N'sellerPhoto4_W'
GO
USE [master]
GO
ALTER DATABASE [BuyAndSell2] SET  READ_WRITE 
GO
