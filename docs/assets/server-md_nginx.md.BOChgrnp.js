import{_ as s,c as n,o as a,a3 as p}from"./chunks/framework.RbRFL2qC.js";const g=JSON.parse('{"title":"Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"server-md/nginx.md","filePath":"server-md/nginx.md","lastUpdated":1721572582000}'),t={name:"server-md/nginx.md"},e=p(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><p>一个高性能的HTTP和反向代理服务器，也用作邮件代理服务器</p><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><p>要在 nginx 目录下使用命令</p><p>win:</p><ul><li>启动： <code>nginx </code> <code>start nginx</code></li><li>快速关闭： <code>nginx -s stop</code></li><li>平稳关闭: <code>nginx -s quit</code></li><li>重载配置文件： <code>nginx -s reload</code></li><li>检查配置文件： <code>nginx -t</code></li><li>查看版本： <code>nginx -v</code></li><li>指定配置文件: <code>nginx -c [配置文件地址]</code></li></ul><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><h3 id="nginx-conf" tabindex="-1">nginx.conf <a class="header-anchor" href="#nginx-conf" aria-label="Permalink to &quot;nginx.conf&quot;">​</a></h3><p><code>nginx.conf</code> 是 Nginx 的主配置文件，通常位于 <code>/etc/nginx/</code> 目录下</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span># -------启动的进程有多少个------- 根据cpu核心 多核可做高并发 （ndoe可以使用os.cpus()获取几核几线程）</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#-------日志-------</span></span>
<span class="line"><span>#error_log  logs/error.log;</span></span>
<span class="line"><span>#error_log  logs/error.log  notice;</span></span>
<span class="line"><span>#error_log  logs/error.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#-------进程连接数-------</span></span>
<span class="line"><span>events{</span></span>
<span class="line"><span>    # 每个进程允许的最大连接数</span></span>
<span class="line"><span>    worker_connections 1024; </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># -------http服务器-------</span></span>
<span class="line"><span>http{</span></span>
<span class="line"><span>    # 文件扩展名与文件类型映射表 （这个出问题，常会有文件不生效的情况）</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream; #默认的类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #nginx 特性 处理大的静态文件（效率高）,通过线程池进行分布式加载</span></span>
<span class="line"><span>    sendfile        on; #on 为开启状态</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #------- 超时时间-------  </span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #------- 压缩-------   html css js</span></span>
<span class="line"><span>    gzip on;</span></span>
<span class="line"><span>    #gzip_comp_level 6; #压缩级别 越高越屌 cpu消耗越高 一般都是6</span></span>
<span class="line"><span>    #gzip_types text/plain text/css text/xml text/javascript #指定要压缩的类型</span></span>
<span class="line"><span>    #gzip_static on | off | always;#压缩静态资源 .gz文件 没有就不用管</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------  负载均衡 -------  设置这个后需要把代理的名称也对应 </span></span>
<span class="line"><span>    #默认轮训从上到下</span></span>
<span class="line"><span>    #weight权重越大就要承受更多请求更优先</span></span>
<span class="line"><span>    upstream xiajibaqv {</span></span>
<span class="line"><span>        server 127.0.0.1:9001 weight=1;#服务器地址1</span></span>
<span class="line"><span>        server 127.0.0.1:9002 weight=3;#服务器地址2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #backup 备用服务器 （容灾）</span></span>
<span class="line"><span>        server 127.0.0.1:9003 backup;#服务器地址3</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #------限速-------  </span></span>
<span class="line"><span>    #$binary_remote_addr是内置变量 这里可以起其他名字但一般都是这个 one也可以自己起 10m允许的是内存大小 1r/s一秒只允许一个请求</span></span>
<span class="line"><span>    limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s; #限制每秒1个请求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------缓存技术------- windows使用时路径必须是绝对路径 Mac可以相对路径</span></span>
<span class="line"><span>    #levels 缓存目录 1:2 就是有两层目录</span></span>
<span class="line"><span>    #keys_zone 缓存名字 hhh 大小是 10m</span></span>
<span class="line"><span>    #max_size 最大内存1g</span></span>
<span class="line"><span>    #incative 60m 60分钟内没有使用就删除</span></span>
<span class="line"><span>    proxy_cache_path C:/huancun/666/xxx levels=1:2 keys_zone=hhh:10m max_size=1g incative=60m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------  http服务器管理-------   （可以有很多个）</span></span>
<span class="line"><span>    server{</span></span>
<span class="line"><span>        listen       80; #端口号</span></span>
<span class="line"><span>        server_name  localhost; #ip地址或域名</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------  代理-------  ， /是路劲</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        #使用限速 zone=后面的值要和上面声明的对应上 </span></span>
<span class="line"><span>        #burst允许短时间内突破设置的请求次数 这里就是10次请求(虽然上面设定的是每秒1次，展示容错！)</span></span>
<span class="line"><span>        #nodelay 没有延迟</span></span>
<span class="line"><span>        limit_req zone=one burst=10 nodelay;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        root html; #html的根目录</span></span>
<span class="line"><span>        index index.html index.htm index.php; #根目录下对应的文件</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #------- 跨域-------   (服务端到服务端叫反向代理，客户端向客户端是正向代理)</span></span>
<span class="line"><span>    location /api{ #这里api可自定义名称 发情求时用这个代替下面的链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #代理到 9001 端口</span></span>
<span class="line"><span>        #如果出现 404 就要检查请求的接口是否带有api 如果你定义的接口是/api/list就没问题，但你的接口是/list ，但访问时因为代理就会变成了 /api/list 就会404</span></span>
<span class="line"><span>        #proxy_pass http://localhost:9001; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #设置负载均衡后要和均衡名称一样</span></span>
<span class="line"><span>        proxy_pass http://xiajibaqv; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #用正则把api去掉</span></span>
<span class="line"><span>        rewrite ^/api/(.*) /$1 break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------防盗链-------（拦截图片资源来做防盗链）</span></span>
<span class="line"><span>    location ~*.*\\.(jpg|jpeg|gif|png|ico)$ {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #使用缓存</span></span>
<span class="line"><span>        proxy_cache hhh; #缓存名字 上面配置的对应上</span></span>
<span class="line"><span>        proxy_cache_methods GET;#请求的方式</span></span>
<span class="line"><span>        proxy_cache_key $host$url$is_args$args; #缓存key 这里写的是:主机+域名?参数(有参数就带没有就不带)</span></span>
<span class="line"><span>        proxy_cache_valid 200 302 10m; #缓存策略 时间</span></span>
<span class="line"><span>        proxy_cache_min_uses 3; #最少使用3次才缓存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        root html/static; #访问图片时就不用带static目录了</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #none 允许Referer为空 在调试时浏览器直接访问会更方便</span></span>
<span class="line"><span>        #blocked 允许Referer没有 </span></span>
<span class="line"><span>        #localhost 允许来源是localhost</span></span>
<span class="line"><span>        #valid_referers none blocked localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #这里设置后 就会检查请求头的Referer是不是我们设置的ip或域名，如果不是就返回403</span></span>
<span class="line"><span>        valid_referers 127.0.0.1 http://localhost; #允许访问的域名 满足一个就可以</span></span>
<span class="line"><span>        if ($invalid_referer) { #不符合就返回403</span></span>
<span class="line"><span>            return 403;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------报错页面------- 在 500 502 503 504 时，返回的页面</span></span>
<span class="line"><span>    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>    location = /50.html{</span></span>
<span class="line"><span>        root    html;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #-------  配置https-------  </span></span>
<span class="line"><span>    server { #每个server是独立 上面配置的防盗链这里要重新配置一下</span></span>
<span class="line"><span>        listen       443 ssl;#默认走443端口</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ssl_certificate      cert.pem;#这里换成自己的证书就行</span></span>
<span class="line"><span>        ssl_certificate_key  cert.key;#这里换成自己的证书就行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>        ssl_session_timeout  5m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>        ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>配置https需要证书，使用openssl生成：</p><ol><li>生成私钥</li></ol><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> genpkey</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -algorithm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RSA</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -out</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> private.key</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -pkeyopt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rsa_keygen_bits:2048</span></span></code></pre></div><ol start="2"><li>生成证书请求文件 CSR</li></ol><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> req</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> private.key</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -out</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> csr.csr</span></span></code></pre></div><ol start="3"><li>通过csr生成证书</li></ol><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> x509</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -req</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> csr.csr</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -signkey</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> private.key</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -out</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> certificate.crt</span></span></code></pre></div><h4 id="vue路由问题" tabindex="-1">vue路由问题 <a class="header-anchor" href="#vue路由问题" aria-label="Permalink to &quot;vue路由问题&quot;">​</a></h4><p>只有使用history才会出现</p><p>原因就是histroy是虚拟的路由，并不是真实地址 而nginx寻找的是真实的地址</p><p>因为vue正好是单页应用加入以下配置解决：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> try_files $uri $uri/ /index.html;</span></span></code></pre></div><h2 id="内置变量对照表" tabindex="-1">内置变量对照表 <a class="header-anchor" href="#内置变量对照表" aria-label="Permalink to &quot;内置变量对照表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td>$arg_<em>name</em></td><td>表示请求行中的任意参数，<em>name</em> 为参数名称</td></tr><tr><td>$args</td><td>表示请求行中的参数部分</td></tr><tr><td>$binary_remote_addr</td><td>二进制形式表示的客户端地址</td></tr><tr><td>$body_bytes_sent</td><td>发送到客户端的字节数，不包括响应头</td></tr><tr><td>$bytes_received</td><td>接受到客户端的字节数</td></tr><tr><td>$bytes_sent</td><td>发送到客户端的字节数</td></tr><tr><td>$connection</td><td>连接序列号</td></tr><tr><td>$connection_requests</td><td>当前连接的请求数量</td></tr><tr><td>$connection_time</td><td>连接时间，单位为：ms</td></tr><tr><td>$cookie_<em>name</em></td><td>表示任意 cookie，<em>name</em> 为 cookie 名称</td></tr><tr><td>$date_gmt</td><td>GMT 时间</td></tr><tr><td>$date_local</td><td>本地时间</td></tr><tr><td>$host</td><td>按照以下顺序获取主机信息：请求行中的主机名，或“Host”请求头字段中的主机名，或与请求匹配的服务器名。</td></tr><tr><td>$hostname</td><td>主机名</td></tr><tr><td>$http_<em>name</em></td><td>表示任意请求头；<em>name</em> 为请求头名称，其中破折号被下划线替换并转换为小写；如：$http_user_agent，$http_x_forwarded_for</td></tr><tr><td>$proxy_add_x_forwarded_for</td><td>将 $remote_addr 的值附加到“X−Forwarded−For”客户端请求头中，由逗号分隔。如果客户端请求头中不存在“X−Forwarded−For”，则 $proxy_add_x_forwarded_for 等于 $remote_addr 。</td></tr><tr><td>$proxy_host</td><td>代理服务器的地址和端口</td></tr><tr><td>$proxy_port</td><td>代理服务器的端口</td></tr><tr><td>$query_string</td><td>同 $args</td></tr><tr><td>$remote_addr</td><td>客户端地址</td></tr><tr><td>$remote_port</td><td>客户端端口</td></tr><tr><td>$remote_user</td><td>Basic 身份验证中提供的用户名</td></tr><tr><td>$request</td><td>完整请求行</td></tr><tr><td>$request_body</td><td>请求体</td></tr><tr><td>$request_body_file</td><td>保存请求体的临时文件</td></tr><tr><td>$request_length</td><td>请求长度（包括请求行、头部和请求体）</td></tr><tr><td>$request_method</td><td>请求方法</td></tr><tr><td>$request_time</td><td>请求处理时间，单位为：ms</td></tr><tr><td>$request_uri</td><td>完整请求行</td></tr><tr><td>$scheme</td><td>请求协议，http 或 https</td></tr><tr><td>$server_addr</td><td>接受请求的服务器地址</td></tr><tr><td>$server_name</td><td>接受请求的服务器名称</td></tr><tr><td>$server_port</td><td>接受请求的服务器端口</td></tr><tr><td>$server_protocol</td><td>请求协议，通常为 HTTP/1.0、HTTP/1.1 或 HTTP/2.0</td></tr><tr><td>$ssl_cipher</td><td>建立 SSL 连接所使用的加密套件名称</td></tr><tr><td>$ssl_ciphers</td><td>客户端支持的加密套件列表</td></tr><tr><td>$ssl_client_escaped_cert</td><td>客户端 PEM 格式的证书</td></tr><tr><td>$ssl_protocol</td><td>建立 SSL 连接的协议</td></tr><tr><td>$status</td><td>响应状态码</td></tr><tr><td>$time_iso8601</td><td>ISO 8601 标准格式的本地时间</td></tr><tr><td>$time_local</td><td>Common Log 格式的本地时间</td></tr><tr><td>$upstream_addr</td><td>upstream 服务器的 ip 和端口</td></tr><tr><td>$upstream_bytes_received</td><td>从 upstream 服务器接收的字节数</td></tr><tr><td>$upstream_bytes_sent</td><td>发送给 upstream 服务器的字节数</td></tr><tr><td>$upstream_http_<em>name</em></td><td>表示 upstream 服务器任意响应头，<em>name</em> 为响应头名称，其中破折号被下划线替换并转换为小写</td></tr><tr><td>$upstream_response_length</td><td>upstream 服务器的响应长度，单位为：字节</td></tr><tr><td>$upstream_response_time</td><td>upstream 服务器的响应时间，单位为：秒</td></tr><tr><td>$upstream_status</td><td>upstream 服务器的响应状态码</td></tr><tr><td>$uri</td><td>请求 uri</td></tr></tbody></table>`,24),i=[e];function l(r,d,c,o,h,_){return a(),n("div",null,i)}const k=s(t,[["render",l]]);export{g as __pageData,k as default};