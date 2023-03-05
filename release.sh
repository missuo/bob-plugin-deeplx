#!/bin/bash
###
 # @Author: Vincent Young
 # @Date: 2023-03-05 20:29:43
 # @LastEditors: Vincent Young
 # @LastEditTime: 2023-03-05 21:20:06
 # @FilePath: /bob-plugin-deeplx/release.sh
 # @Telegram: https://t.me/missuo
 # 
 # Copyright © 2023 by Vincent, All Rights Reserved. 
### 
version=${1#refs/tags/v}
zip -r bob-plugin-deeplx-$version.bobplugin src

sha256_deeplx=$(sha256sum bob-plugin-deeplx-$version.bobplugin | cut -d ' ' -f 1)
echo $sha256_deeplx

download_link="https://raw.githubusercontent.com/missuo/bob-plugin-deeplx/main/dist/bob-plugin-deeplx-$version.bobplugin"

new_version="{\"version\": \"$version\", \"desc\": \"None\", \"sha256\": \"$sha256_deeplx\", \"url\": \"$download_link\", \"minBobVersion\": \"0.5.0\"}"

json_file='appcast.json'
json_data=$(cat $json_file)

updated_json=$(echo $json_data | jq --argjson new_version "$new_version" '.versions += [$new_version]')

echo $updated_json > $json_file
mkdir dist
# move to dist
mv *.bobplugin dist