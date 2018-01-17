#
# This file is the myinit recipe.
#

SUMMARY = "Simple myinit application"
SECTION = "PETALINUX/apps"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

SRC_URI = "file://myinit"
SRC_URI += "file://myinit_run.sh"
SRC_URI += "file://myip_controller.elf"
SRC_URI += "file://ServerIoT"

S = "${WORKDIR}"

inherit update-rc.d
INITSCRIPT_NAME = "myinit"
INITSCRIPT_PARAMS = "start 99 S ."

do_install() {
	# myinit is init daemon
	install -d ${D}${sysconfdir}/init.d
	install -m 0755 ${S}/myinit ${D}${sysconfdir}/init.d/myinit

	# myinit.sh is shell script called from myinit
	install -d ${D}${bindir}
	install -m 0755 myinit_run.sh ${D}${bindir}

	# install C application as binary file
	install -m 0755 ${S}/myip_controller.elf ${D}/${bindir}

	# install python script and realated files in a directory
	install -d ${D}/home/root/www
	cp -r ${S}/ServerIoT ${D}/home/root/www
}
FILES_${PN} += "/home/root/www"
FILES_${PN} += "${sysconfdir}/*"
