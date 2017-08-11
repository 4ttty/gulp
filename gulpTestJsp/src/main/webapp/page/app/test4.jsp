<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="static/css/css4.css">
<script type="text/javascript" src="static/js/test1.js"></script>
</head>


<body class="box-all">
<input type="button" value="测试1" onclick="test1()"/>
	<div class="crumbs">
		<a href="/index">首页</a> / 子账号管理 / 子账号列表
	</div>
	<div style="margin-left: 15px;; margin-right: 10px;">
		<div>
			<div class="polling">
				<div class="title">查询</div>
				<form id="form" enctype="multipart/form-data" method="post">
					<ul>
						<li><label class="control-label">商户名称:</label> <span
							class="right"><select name="popId" id="popId"
								style="width: 300px;">
									<c:if test="${reqParam.popId!=null}">
										<option value="${reqParam.popId}" selected="selected">${reqParam.popNameDisplay}</option>
									</c:if>
							</select></span></li>

						<li class="right">
							<button type="button" class="btn" 
							 onclick="addClear()"  
							>添加</button>
						</li>
						<li class="right">
							<button type="button" class="btn" onclick="search()">查询</button>
						</li>
						
						
					</ul>
				</form>
			</div>

			<div class="detailed">
				<div class="grid-fixed" id="grid"></div>
				<div class="pagin" id="page"></div>
			</div>
		</div>

	</div>



	<div class="modal fade in" id="dialogAdd" role="dialog">
		<div class="modal-dialog ">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">x</button>
					<h4 id="hDialog" class="modal-title">添加</h4>
					<br>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-10">
							<div class="input-group">
								<div class="col-xs-10">
									<input type="text" class="form-control" placeholder="手机号"
										id="phone">
								</div>
								<span class="input-group-btn">
									<button class="btn btn-default" type="button"
										onclick="queryPassport()">查询</button>
								</span>
							</div>
							<!-- /input-group -->
						</div>
						<!-- /.col-lg-6 -->
					</div>
					<!-- /.row -->

					<div class="table-container mt20">

						<table class="table table-simple">
							<thead>
								<tr>
									<th>ID</th>
									<th>手机号</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="resultList">

							</tbody>
						</table>
						<div id="note" style="color:red;display:none;">没有查询到符合条件的数据！<a href="javascript:void(0)" onclick="registerPassport()">点此直接添加</a></div>
					</div>
				</div>

			</div>
		</div>
	</div>
</body>
</html>
