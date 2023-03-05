#!/bin/bash
###
 # @Author: Vincent Young
 # @Date: 2023-03-05 20:29:43
 # @LastEditors: Vincent Young
 # @LastEditTime: 2023-03-05 20:49:32
 # @FilePath: /bob-plugin-deeplx/scripts/release.sh
 # @Telegram: https://t.me/missuo
 # 
 # Copyright © 2023 by Vincent, All Rights Reserved. 
### 
cd ../

zip -r bob-plugin-deeplx.bobplugin src

sha256_deeplx=$(sha256sum bob-plugin-deeplx.bobplugin | cut -d ' ' -f 1)

download_link="https://github.com/OwO-Network/DeepLX/releases/$1/bob-plugin-deeplx.bobplugin"

new_version="{\"version\": \"$1\", \"desc\": \"None\", \"sha256\": \"$sha256_deeplx\", \"url\": \"$download_link\", \"minBobVersion\": \"0.5.0\"}"

json_file='appcast.json'
json_data=$(cat $json_file)

updated_json=$(echo $json_data | jq --argjson new_version "$new_version" '.versions += [$new_version]')

echo $updated_json > $json_file

# move to dist
mv bob-plugin-deeplx.bobplugin dist