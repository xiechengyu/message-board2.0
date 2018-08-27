var express = require('express')

var bodyParser = require('body-parser')

var app = express();

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]
//配置使用art-template模板引擎
//第一个参数，表示，当渲染以.art结尾的文件的时候。使用art-template模板引擎
//express-art-template是准吗用来在express中吧art-template整合到express中
//虽然外面这里不需要加载art-template但是也必须安装
//原因就在于express-art-template依赖了art-template
app
  .engine('html',require('express-art-template'))

//express为response相应对象提供了一个方法：render
//render方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
//res.render('html模板名'，{模板数据})
//第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
//也就是说express有一个约定：开发人员把所有视图文件都放到views目录中

//如果想要修改默认的views目录，可以这样:
// app.set('views',render函数的默认路径)

  .use('/public',express.static('./public'))

  //配置body-parser中间件（插件，专门它用来解析post请求体）
  //parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended : false}))
  //parse application/json
  .use(bodyParser.json())
  .get('/',function (req,res) {
    res.render('index.html',{
      comments:comments
    })
  })
  .get('/admin',function (req,res) {
    res.render('admin/index.html',{
      title:'管理系统',
    })
  })
  .get('/post',function (req,res) {
    res.render('post.html')
  })
//当以post请求/post的时候，执行指定的处理函数
  //这样我们就可以利用不同的 请求方法让一个请求路径使用多次
  .post('/post',function (req,res) {
    // console.log('收到表单post请求了');
    //1.获取表单POST请求体数据
    //2.处理
    //3.发送响应
    //req.query只能拿get请求参数
    // console.log(req.body);
    var comment = req.body
    comment.dateTime = new Date()
    comments.unshift(comment)
    res.redirect('/')
  })
 /* .get('/pinglun',function (req,res) {
    var comment = req.query
    comment.dateTime = new Date()
    comments.unshift(comment)
    res.redirect('/')
  })*/

  .listen(3000,function () {
    console.log('running');
  })