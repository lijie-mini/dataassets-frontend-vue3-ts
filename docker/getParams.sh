echo "setting web ipport ........................."
pre="window.config = {"
end="}"
param=$param\"VUE_APP_UNIVERSITY_NAME\":\"$VUE_APP_UNIVERSITY_NAME\",
param=$param\"VUE_APP_AUTH_TYPE_FRONT_URL\":\"$VUE_APP_AUTH_TYPE_FRONT_URL\",
param=$param\"VUE_APP_NAME\":\"$VUE_APP_NAME\",
param=$param\"VUE_APP_SYSTEM_API\":\"$VUE_APP_SYSTEM_API\",
param=$param\"VUE_APP_CODE_API\":\"$VUE_APP_CODE_API\",
param=$param\"VUE_APP_MODEL_API\":\"$VUE_APP_MODEL_API\",
param=$param\"VUE_APP_DOCUMENT_API\":\"$VUE_APP_DOCUMENT_API\",
param=$param\"VUE_APP_MAINDATA_API\":\"$VUE_APP_MAINDATA_API\",
param=$param\"VUE_APP_METADATA_API\":\"$VUE_APP_METADATA_API\",
param=$param\"VUE_APP_DATAQUALITY_API\":\"$VUE_APP_DATAQUALITY_API\",
param=$param\"VUE_APP_SWOP_API\":\"$VUE_APP_SWOP_API\",
param=$param\"VUE_APP_DATAEXCHANGE_API\":\"$VUE_APP_DATAEXCHANGE_API\",
param=$param\"VUE_APP_DATAFILE_API\":\"$VUE_APP_DATAFILE_API\",
param=$param\"VUE_APP_MESSAGE_API\":\"$VUE_APP_MESSAGE_API\",
param=$param\"VUE_APP_SERVER_API\":\"$VUE_APP_SERVER_API\",
param=$param\"VUE_APP_DATASERVICE_API\":\"$VUE_APP_DATASERVICE_API\",
param=$param\"VUE_APP_DATAASSETS_API\":\"$VUE_APP_DATAASSETS_API\",
param=$param\"VUE_APP_MANAGEMENT_URL\":\"$VUE_APP_MANAGEMENT_URL\",
param=$param\"VUE_APP_AUTH_TYPE\":\"$VUE_APP_AUTH_TYPE\",
param=$param\"VUE_APP_PROCESSPLATFORM_URL\":\"$VUE_APP_PROCESSPLATFORM_URL\",
param=$param\"VUE_APP_AUTH_TYPE_LOGIN_URL\":\"$VUE_APP_AUTH_TYPE_LOGIN_URL\",
param=$param\"VUE_APP_AUTH_TYPE_CAS_URL\":\"$VUE_APP_AUTH_TYPE_CAS_URL\",
param=$param\"VUE_APP_NO_AUTH_SYSTEM_API\":\"$VUE_APP_NO_AUTH_SYSTEM_API\",
param=$param\"VUE_APP_STATISTICS_API\":\"$VUE_APP_STATISTICS_API\",
param=$param\"VUE_APP_DATA_SERVICE_API\":\"$VUE_APP_DATA_SERVICE_API\",


config=${pre}${param}${end}
echo " web ipport,config is........................."
echo $config
#echo $config>"/usr/share/nginx/html/$APP_NAME/config.js"
echo $config>"/usr/share/nginx/html/config.js"
echo "web ipport setted ........................."
