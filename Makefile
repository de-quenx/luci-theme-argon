#
# Copyright (C) 2008-2019 Jerrykuku
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Argon Theme X
LUCI_DEPENDS:=+wget +jsonfilter
PKG_VERSION:=2.7.9
PKG_RELEASE:=23022026
PKG_MAINTAINER:=fidz

CONFIG_LUCI_CSSTIDY:=

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
