USE [ADCrawler]
GO
/****** Object:  User [adcrawleradmin]    Script Date: 10/19/2016 2:43:18 PM ******/
CREATE USER [adcrawleradmin] FOR LOGIN [adcrawleradmin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [adcrawleradmin]
GO
/****** Object:  StoredProcedure [dbo].[AddADProperty]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 17 October 2016
-- Description:	Adds a new AD property item.
-- =============================================
CREATE PROCEDURE [dbo].[AddADProperty]
	@Name	nvarchar(256),
	@NormalizedName	nvarchar(256),
	@Description	nvarchar(max),
	@AvailableAsDefault	bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert into ADProperties(Name, NormalizedName, [Description], AvailableAsDefault) 
	values(@Name, @NormalizedName, @Description, @AvailableAsDefault);

	Select Id from ADProperties where Name = @Name;
END

GO
/****** Object:  StoredProcedure [dbo].[AddApplication]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 19 October 2016
-- Description:	Add a new application
-- =============================================
CREATE PROCEDURE [dbo].[AddApplication]
	@Id	nvarchar(450),
	@Name	nvarchar(256),
	@Description	nvarchar(max),
	@Settings	xml
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert into Applications values(@Id, @Name, @Description, @Settings);
END

GO
/****** Object:  StoredProcedure [dbo].[AuthenticateUser]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[ChangeDefaultFlagForADProperty]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 19 October 2016
-- Description:	Changes the default flag for ad property.
-- =============================================
CREATE PROCEDURE [dbo].[ChangeDefaultFlagForADProperty] 
	@Id	uniqueidentifier,
	@Flag	bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Update ADProperties set AvailableAsDefault = @Flag where Id = @Id;
END

GO
/****** Object:  StoredProcedure [dbo].[CreateRole]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteADPropertyById]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 18 October 2016
-- Description:	Deletes an AD property item based on given id.
-- =============================================
CREATE PROCEDURE [dbo].[DeleteADPropertyById]
	@Id	uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	--SET NOCOUNT ON;

    Delete from ADProperties where Id=@Id;
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteRoleById]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteRoleByName]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetADPropertyByName]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 17 Oct 2016
-- Description:	Get an AD property based on given name.
-- =============================================
CREATE PROCEDURE [dbo].[GetADPropertyByName]
	@Name	nvarchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Select Id, Name, NormalizedName, [Description], AvailableAsDefault from ADProperties where Name=@Name;
END

GO
/****** Object:  StoredProcedure [dbo].[GetAllADProperties]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jatin Prajapati
-- Create date: 14 October 2016
-- Description:	Gets all the ad properties defined in the database.
-- =============================================
CREATE PROCEDURE [dbo].[GetAllADProperties] 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Id, Name, NormalizedName, [Description], AvailableAsDefault from ADProperties order by Name;
END

GO
/****** Object:  StoredProcedure [dbo].[GetRoleById]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetRoleByName]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetRoles]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserByName]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[ADProperties]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADProperties](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[NormalizedName] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[AvailableAsDefault] [bit] NULL,
 CONSTRAINT [PK_ADProperties] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Applications]    Script Date: 10/19/2016 2:43:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Applications](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Settings] [xml] NULL,
 CONSTRAINT [PK_Applications] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10/19/2016 2:43:18 PM ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10/19/2016 2:43:18 PM ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'00000000000000_CreateIdentitySchema', N'7.0.0-rc1-16348')
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'dd67a444-07e5-493b-81a2-0318afeec98a', N'l', N'l', N'City name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'4be0e990-aea0-463c-aa55-0af9ee6ea11d', N'assistant', N'assistant', NULL, 1)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'e477b4ec-ec67-485f-8abb-0be2bc2b800a', N'givenName', N'givenname', N'First name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'a9067b34-ddc3-4883-84d0-0f7645e97464', N'c', N'c', N'Country Abbreviatiion', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'64eecdef-17cd-413a-98e7-235690d55b2d', N'telephoneNumber', N'telephonenumber', N'Telephone number', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'6693092c-f238-4e4b-a8a9-2553bd62ffb8', N'middleName', N'middlename', N'Middle name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'0b71595e-5e2f-4bce-b8c2-27beca474d67', N'division', N'division', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'ad79f794-a486-40e5-9d3f-3cf04bfe4f67', N'sn', N'sn', N'Last name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'542fb452-90c2-434f-be74-42589018b655', N'displayName', N'displayname', N'Display name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'0657440d-6a84-469a-ae72-43fab9e409d1', N'ipPhone', N'ipphone', N'IP Phone Number', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'f0b8c181-c1f5-4708-87cd-51d41afb8ceb', N'cn', N'cn', N'Connection name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'75b60a81-66ad-4060-9852-5371e2435019', N'info', N'info', N'Notes', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'633b8462-404f-49b4-9eb0-5b709f981775', N'department', N'department', N'Department name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'efa935b5-44a2-4099-a1f3-5b7e9f5fbbab', N'distinguisedName', N'distinguishedname', N'X500 distinguished name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'2b33925f-c1e3-4184-b83a-63e25c0c2cd4', N'canonicalName', N'canonicalname', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'77b2431a-8cb5-437d-92cb-6ff70972ccc0', N'description', N'description', N'Description', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'd44e300d-beb5-4ae7-817b-75cff14f538d', N'company', N'company', N'Company', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'67b0f483-ca67-469b-a01a-80331dcc806d', N'mobile', N'mobile', N'Mobile number', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'ec6db4e3-b8f5-41e6-baa3-87fb1b0ac02d', N'streetAddress', N'streetaddress', N'Street address', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'cc185ea5-332f-4001-a495-8d7974cbf010', N'mail', N'mail', N'Email address', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'e9987a11-1a1c-4a35-afdc-904ed6ccfad7', N'url', N'url', N'Web Page Address', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'3bb9e14d-d945-4f50-bd7a-9293019b27a7', N'facsimileTelephoneNumber', N'facsimiletelephonenumber', N'Fax Number', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'1fe418b5-40d5-448e-a14e-93a181e3bd06', N'personalTitle', N'personaltitle', N'Title', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'3324b04a-4e4a-4b95-b606-9ada7ab74047', N'sAMAccountName', N'samaccountname', N'Logon name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'2cbf79c7-16da-4e6b-9bea-a0de2d21eb1d', N'userPrincipalName', N'userprincipalname', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'858fae7b-c0f1-4454-8d8e-a1546f8595d7', N'co', N'co', N'Country name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'ae527f8e-3cfe-4a1a-945b-a1e034cf0d2b', N'st', N'st', N'State / province', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'66fb7a08-497a-4ff2-96a4-aceb1966e86a', N'title', N'title', N'Job Title', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'2de35cfb-6cca-49af-9e3c-b75bf1f5a12a', N'memberOf', N'memberof', N'Group membership', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'83621a66-c1ce-482e-a4ae-b7cf242eee47', N'name', N'name', N'Name', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'31f044ee-f3e4-4e2b-b1f9-c3a76cdca17f', N'createTimeStamp', N'createtimestamp', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'1865d626-194a-4205-9a91-cf4b9198b995', N'adminDisplayName', N'admindisplayname', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'99be0dd4-c8bd-429d-91a9-da10c3fa7ca5', N'street', N'street', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'22b3e4f5-bb46-4c87-a797-db437fdd5c78', N'postalCode', N'postalcode', N'Postal code', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'd7cccf4d-3b93-4791-b903-de2db407c1f2', N'homePhone', N'homephone', N'Home phone', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'decd24bd-38cb-4f3d-99e0-e2532be06c29', N'initials', N'initials', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'93456de1-3946-4e1f-aabf-e5a7c9d33339', N'adminDescription', N'admindescription', NULL, 1)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'93c7f2e1-49b4-4f9e-9a65-e6f6eca1d79c', N'manager', N'manager', N'Manager', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'ed0c9c81-f475-49ec-a4a7-e8385713da3e', N'comment', N'comment', N'Comment', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'f9221364-2e2b-43ac-8857-ef93402e8bff', N'homePostalAddress', N'homepostaladdress', N'Home address', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'9e409bf4-4cb1-43d2-a74f-f08d86f88099', N'employeeID', N'employeeid', NULL, 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'9beef722-d9df-4e03-8b48-f6ede89f8326', N'directReports', N'directreports', N'Direct reports', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'cbf06f3a-eb07-41bb-a8b6-f949ae37c3a4', N'countryCode', N'countrycode', N'Country code', 0)
GO
INSERT [dbo].[ADProperties] ([Id], [Name], [NormalizedName], [Description], [AvailableAsDefault]) VALUES (N'1968e413-0cc0-4998-ba58-fdc603e26848', N'postOfficeBox', N'postofficebox', N'Post office box', 0)
GO
INSERT [dbo].[AspNetUsers] ([Id], [AccessFailedCount], [ConcurrencyStamp], [Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], [NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], [SecurityStamp], [TwoFactorEnabled], [UserName]) VALUES (N'0d82b973-1b95-460c-8587-5517ed909343', 0, N'01e00fe1-0d3b-4907-b3ab-53f8a96d8c17', N'jatin.prajapati@outlook.com', 1, 0, NULL, N'JATIN.PRAJAPATI@OUTLOOK.COM', N'JATIN.PRAJAPATI@OUTLOOK.COM', N'$2a$10$kKtG9xvJStxt0FRrgftLTu2wWdiZlYc/ZzDru/7Y8mXHblbaGpDKa', N'8511946279', 1, NULL, 0, N'jatin.prajapati@outlook.com')
GO
ALTER TABLE [dbo].[ADProperties] ADD  CONSTRAINT [DF_ADProperties_Id]  DEFAULT (newid()) FOR [Id]
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
