#!/bin/bash

# 1. 本地npm打包vue程序
echo "正在进行本地npm打包vue程序..."
npm install
npm run build
cd dist
tar -zcvf dist.tar.gz ./*
mv dist.tar.gz ../
cd ../
echo "打包完成."

# 2. ssh连接远程服务器，清空目标目录
REMOTE_USER="root"
REMOTE_HOST="43.138.58.9"
REMOTE_PATH="/root/frontend/manager"

echo "正在连接远程服务器并清空目标目录..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "rm -rf ${REMOTE_PATH}/*"
echo "远程目录清空完成."

# 3. 将build下的内容，发送到远端目录
LOCAL_BUILD_TAR_FILE="dist.tar.gz" # 根据你的vue项目配置进行修改

echo "正在将build下的内容发送到远端目录..."
scp -r ${LOCAL_BUILD_TAR_FILE} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
ssh ${REMOTE_USER}@${REMOTE_HOST} "tar -zxvf ${REMOTE_PATH}/${LOCAL_BUILD_TAR_FILE} -C ${REMOTE_PATH}/"
echo "内容已发送到远端目录."

echo "清理本地文件"
rm -rf dist.tar.gz
echo "脚本执行完毕."
