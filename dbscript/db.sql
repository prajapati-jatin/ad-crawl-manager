USE [master]
GO
/****** Object:  Database [ADCrawler]    Script Date: 10/7/2016 2:50:01 PM ******/
CREATE DATABASE [ADCrawler]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ADCrawler', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\ADCrawler.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ADCrawler_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\ADCrawler_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ADCrawler] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ADCrawler].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ADCrawler] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ADCrawler] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ADCrawler] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ADCrawler] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ADCrawler] SET ARITHABORT OFF 
GO
ALTER DATABASE [ADCrawler] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ADCrawler] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [ADCrawler] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ADCrawler] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ADCrawler] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ADCrawler] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ADCrawler] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ADCrawler] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ADCrawler] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ADCrawler] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ADCrawler] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ADCrawler] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ADCrawler] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ADCrawler] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ADCrawler] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ADCrawler] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ADCrawler] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ADCrawler] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ADCrawler] SET RECOVERY FULL 
GO
ALTER DATABASE [ADCrawler] SET  MULTI_USER 
GO
ALTER DATABASE [ADCrawler] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ADCrawler] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ADCrawler] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ADCrawler] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ADCrawler', N'ON'
GO
USE [ADCrawler]
GO
/****** Object:  User [adcrawleradmin]    Script Date: 10/7/2016 2:50:01 PM ******/
CREATE USER [adcrawleradmin] FOR LOGIN [adcrawleradmin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [adcrawleradmin]
GO
/****** Object:  StoredProcedure [dbo].[AuthenticateUser]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Authenticates the user based on given username and password.
-- =============================================
CREATE PROCEDURE [dbo].[AuthenticateUser]
	@UserName	nvarchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Select u.Id, u.AccessFailedCount, u.ConcurrencyStamp, u.Email,
	u.EmailConfirmed, u.LockoutEnabled, u.LockoutEnd, u.NormalizedEmail,
	u.NormalizedUserName, u.PasswordHash, u.PhoneNumber, u.PhoneNumberConfirmed, u.UserName from AspNetUsers u where u.UserName = @UserName;
END

GO
/****** Object:  StoredProcedure [dbo].[CreateRole]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CreateRole] 
	@Id	nvarchar(450),
	@Name	nvarchar(256),
	@NormalizedName	nvarchar(256),
	@ConcurrencyStamp	nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert into AspNetRoles values(@Id, @ConcurrencyStamp, @Name, @NormalizedName);
END

GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7 October 2016
-- Description:	Creates a user.
-- =============================================
CREATE PROCEDURE [dbo].[CreateUser]
	-- Add the parameters for the stored procedure here
	@Id	nvarchar(450),
	@UserName nvarchar(256),
	@NormalizedUserName nvarchar(256),
	@PasswordHash	nvarchar(max),
	@Email nvarchar(256),
	@EmailConfirmed bit = 0,
	@NormalizedEmail nvarchar(256),
	@AccessFailedCount	int,
	@ConcurrancyStamp	nvarchar(max),
	@LockoutEnabled	bit,
	@LockoutEnd	datetimeoffset(7) = NULL,
	@PhoneNumber	nvarchar(max),
	@PhoneNumberConfirmed	bit,
	@RoleId	nvarchar(450) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Insert into AspNetUsers values(@Id, @AccessFailedCount, @ConcurrancyStamp,@Email, @EmailConfirmed,
	@LockoutEnabled, @LockoutEnd, @NormalizedEmail, @NormalizedUserName, @PasswordHash,
	@PhoneNumber, @PhoneNumberConfirmed, NULL, 0, @UserName);	

	IF(@RoleId <> NULL)
	BEGIN
	Insert into AspNetUserRoles values(@Id, @RoleId);
	END
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteRoleById]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Deletes the role by provided Id.
-- =============================================
CREATE PROCEDURE [dbo].[DeleteRoleById]
	@Id	nvarchar(450)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Delete from AspNetRoles where Id = @Id;
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteRoleByName]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Deletes the role based on given name.
-- =============================================
CREATE PROCEDURE [dbo].[DeleteRoleByName]
	@Name	nvarchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Delete from AspNetRoles where Name = @Name;
END

GO
/****** Object:  StoredProcedure [dbo].[GetRoleById]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Gets the role based on given id.
-- =============================================
CREATE PROCEDURE [dbo].[GetRoleById]
	@Id	nvarchar(450)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Id, ConcurrencyStamp, Name, NormalizedName from AspNetRoles where Id = @Id;
END

GO
/****** Object:  StoredProcedure [dbo].[GetRoleByName]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Gets the role based on given name.
-- =============================================
CREATE PROCEDURE [dbo].[GetRoleByName]
	@Name	nvarchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Id, ConcurrencyStamp, Name, NormalizedName from AspNetRoles where Name = @Name;
END

GO
/****** Object:  StoredProcedure [dbo].[GetRoles]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Gets all the roles defined in the database.
-- =============================================
CREATE PROCEDURE [dbo].[GetRoles]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Id, ConcurrencyStamp, Name, NormalizedName from AspNetRoles;
END

GO
/****** Object:  StoredProcedure [dbo].[GetUserByName]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Get a user by provided name.
-- =============================================
CREATE PROCEDURE [dbo].[GetUserByName]
	@Name	nvarchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Select u.Id, u.AccessFailedCount, u.ConcurrencyStamp, u.Email,
		u.EmailConfirmed, u.LockoutEnabled, u.LockoutEnd, u.NormalizedEmail,
		u.NormalizedUserName, u.PhoneNumber, u.PhoneNumberConfirmed,
		u.UserName from AspNetUsers u where u.UserName = @Name;
END

GO
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 7th October 2016
-- Description:	Gets all users from database.
-- =============================================
CREATE PROCEDURE [dbo].[GetUsers]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Select u.Id, u.AccessFailedCount, u.ConcurrencyStamp, u.Email,
		u.EmailConfirmed, u.LockoutEnabled, u.LockoutEnd, u.NormalizedEmail,
		u.NormalizedUserName, u.PhoneNumber, u.PhoneNumberConfirmed,
		u.UserName from AspNetUsers u;
END

GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_HistoryRow] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[RoleId] [nvarchar](450) NULL,
 CONSTRAINT [PK_IdentityRoleClaim<string>] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
 CONSTRAINT [PK_IdentityRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NULL,
 CONSTRAINT [PK_IdentityUserClaim<string>] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NULL,
 CONSTRAINT [PK_IdentityUserLogin<string>] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_IdentityUserRole<string>] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10/7/2016 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[UserName] [nvarchar](256) NULL,
 CONSTRAINT [PK_ApplicationUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [RoleNameIndex]    Script Date: 10/7/2016 2:50:01 PM ******/
CREATE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [EmailIndex]    Script Date: 10/7/2016 2:50:01 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UserNameIndex]    Script Date: 10/7/2016 2:50:01 PM ******/
CREATE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_IdentityRoleClaim<string>_IdentityRole_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_IdentityRoleClaim<string>_IdentityRole_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserClaim<string>_ApplicationUser_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_IdentityUserClaim<string>_ApplicationUser_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserLogin<string>_ApplicationUser_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_IdentityUserLogin<string>_ApplicationUser_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserRole<string>_ApplicationUser_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_IdentityUserRole<string>_ApplicationUser_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserRole<string>_IdentityRole_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_IdentityUserRole<string>_IdentityRole_RoleId]
GO
USE [master]
GO
ALTER DATABASE [ADCrawler] SET  READ_WRITE 
GO
