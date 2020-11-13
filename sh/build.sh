dir=$(dirname $0)
cd $dir && cd ..

rm -rf lib
rm -rf output

npm run build
cp -rf ./lib ./output/
cp package.json ./output/
cp .f2econfig.prod.js ./output/.f2econfig.js
echo 'require("f2e-server")({})' > ./output/start.js
cd output && tar -zcvf ../output.tar.gz * .[!.]* && cd ..