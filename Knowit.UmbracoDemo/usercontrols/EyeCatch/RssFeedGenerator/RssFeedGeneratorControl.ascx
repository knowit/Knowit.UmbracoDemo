<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RssFeedGeneratorControl.ascx.cs" Inherits="EyeCatch.Umbraco.RssFeedGenerator.RssFeedGeneratorControl" %><?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/"> 
	<channel> 
		<title>
			<%= GetTitle() %>
		</title> 
		<link> 
			<%= GetSiteUrl() %>
		</link> 
		<pubDate> 
			<%= GetPublicationDate() %>
		</pubDate> 
		<generator>EyeCatch RSS Generator v2.0</generator> 
		<description> 
			<%= GetDescription() %>
		</description> 
		<%= GetLanguage() %>
		<%= GetAtomLink() %>
		<asp:Literal ID="Items" runat="server"></asp:Literal>
	</channel> 
</rss> 