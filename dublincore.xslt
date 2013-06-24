<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:dc="http://dublincore.org/documents/dcmi-namespace/"
    xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/">
    <xsl:output method="xml"/>

   <xsl:template match="/">
       <OAI-PMH>
           <responseDate></responseDate>
           <request></request>
           <ListRecords>
               <xsl:apply-templates select="/epics-doi/record"/>
           </ListRecords>
       </OAI-PMH>
   </xsl:template>

    <xsl:template match="/epics-doi/record">
        <record>
            <header>
                <identifier></identifier>
                <datestamp></datestamp>
                <setSpec></setSpec>
            </header>
            <metadata>
                <oai_dc:dc>
                    <dc:type></dc:type>
                    <dc:language></dc:language>
                    <dc:title></dc:title>
                    <dc:publisher></dc:publisher>
                    <dc:publisher></dc:publisher>
                    <dc:date></dc:date>
                    <dc:format></dc:format>
                    <dc:creator></dc:creator>
                    <dc:contributor></dc:contributor>
                    <xsl:apply-templates select="/epics-doi/record/dc:identifier"/>
                </oai_dc:dc>
            </metadata>
        </record>
    </xsl:template>

    <xsl:template match="/epics-doi/record/dc:identifier">
        <xsl:copy-of select="."/>
    </xsl:template>
</xsl:stylesheet>