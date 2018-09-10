const fs = require('fs')
const path = require('path')

let mock = {};

meginMock(path.join(__dirname))

function meginMock(pathInfo){
    fs.readdirSync(pathInfo)
    .forEach(function(file){
        if(file === 'webpack.mocker.js'){
            return
        }

        var filePathInfo = path.join(pathInfo, file)
        const info = fs.statSync(filePathInfo)
        if(info.isDirectory()){
            meginMock(filePathInfo)
        }else{
            Object.assign(mock, require(filePathInfo))
        }
    })
}

module.exports = mock;
