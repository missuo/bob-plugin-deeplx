# bob-plugin-deeplx
This is a DeepL plugin for Bob. Based on [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX).

## Intro
The functionality of this plugin is the same as the old [clubxdev/bob-plugin-deeplx](https://github.com/clubxdev/bob-plugin-deeplx). 
The original author has stopped maintaining it, but DeepL supports new languages, so I had to rewrite a plugin to support all languages. This plugin and [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX) are now maintained by me.

**`Alternatives` has been supported since [v1.0.2](https://github.com/missuo/bob-plugin-deeplx#v102), but you must use DeepLX greater or equal to [v0.7.7](https://github.com/OwO-Network/DeepLX).**

## Update Log
### v1.0.6
- Support URL load balancing. (Separate each URL with a comma)

### v1.0.5
- Fix some prompt errors.

### v1.0.4
- Plugin prompt to switch to Chinese.
- Change the plugin name to `DeepL X`.

### v1.0.3
- Support for enabling `Alternatives` or disabling.

### v1.0.2
- Support for display `Alternatives`.

## Guide
### Install Bob
[![Download on the Mac App Store](https://cdn.ripperhe.com/oss/master/2022/0626/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_blk_092917.svg)](https://apps.apple.com/cn/app/id1630034110#?platform=mac)

### Deploy DeepL X
#### Mac - Homebrew (Recommended)
```bash
brew tap owo-network/brew
brew install deeplx
brew services start owo-network/brew/deeplx

# Update to the latest version
brew update
brew upgrade deeplx
brew services restart owo-network/brew/deeplx

# View the currently installed version
brew list --versions deeplx
```
#### Linux Server
```bash
bash <(curl -Ls https://cpp.li/deeplx)
```

### Download Plugin
[Click here](https://github.com/missuo/bob-plugin-deeplx/releases)

**If you are using Homebrew deployment, then you don't need to set up the plugin, it is installed and ready to use. If you are using server deployment, please change the API URL.**
 ```
 # Example:
 http://[IP]:1188/translate
 ```

## Screenshots
![66d36b60152e3dfacf2a1](https://missuo.ru/file/66d36b60152e3dfacf2a1.png)

## Author
**bob-plugin-deeplx** © [Vincent Young](https://github.com/missuo), Released under the [MIT](./LICENSE) License.<br>
