'use strict';
const db = uniCloud.database()
const crypto = require('crypto')

// 密码加密函数
function encryptPassword(password) {
	return crypto.createHash('md5').update(password + 'yunmu-salt-2025').digest('hex')
}

// 生成token
function generateToken(userId) {
	const timestamp = Date.now()
	const randomStr = Math.random().toString(36).substr(2)
	return crypto.createHash('md5').update(userId + timestamp + randomStr + 'yunmu-token-2025').digest('hex')
}

exports.main = async (event, context) => {
	const { action, ...params } = event
	
	let result = {}
	
	try {
		switch (action) {
			case 'register':
				// 用户注册
				const { username, password, mobile, nickname } = params
				
				if (!username || !password) {
					return {
						errCode: 10001,
						errMsg: '用户名和密码不能为空'
					}
				}
				
				// 检查用户名是否已存在
				const existUser = await db.collection('uni-id-users')
					.where({ username })
					.get()
				
				if (existUser.data.length > 0) {
					return {
						errCode: 10002,
						errMsg: '用户名已存在'
					}
				}
				
				// 创建新用户
				const newUser = await db.collection('uni-id-users').add({
					username,
					password: encryptPassword(password),
					mobile: mobile || '',
					nickname: nickname || username,
					status: 0,
					register_date: new Date(),
					register_ip: context.CLIENTIP || '0.0.0.0',
					last_login_date: new Date(),
					token: []
				})
				
				result = {
					errCode: 0,
					errMsg: '注册成功',
					userId: newUser.id
				}
				break
				
			case 'login':
				// 用户登录
				const { username: loginUsername, password: loginPassword } = params
				
				if (!loginUsername || !loginPassword) {
					return {
						errCode: 10003,
						errMsg: '用户名和密码不能为空'
					}
				}
				
				// 查找用户
				const userRes = await db.collection('uni-id-users')
					.where({ 
						username: loginUsername,
						password: encryptPassword(loginPassword)
					})
					.get()
				
				if (userRes.data.length === 0) {
					return {
						errCode: 10004,
						errMsg: '用户名或密码错误'
					}
				}
				
				const user = userRes.data[0]
				const token = generateToken(user._id)
				
				// 更新最后登录时间和token
				await db.collection('uni-id-users')
					.doc(user._id)
					.update({
						last_login_date: new Date(),
						last_login_ip: context.CLIENTIP || '0.0.0.0',
						token: [token]
					})
				
				result = {
					errCode: 0,
					errMsg: '登录成功',
					token,
					userInfo: {
						userId: user._id,
						username: user.username,
						nickname: user.nickname,
						mobile: user.mobile
					}
				}
				break
				
			case 'checkToken':
				// 验证token
				const { token: checkToken } = params
				
				if (!checkToken) {
					return {
						errCode: 10005,
						errMsg: 'token不能为空'
					}
				}
				
				const tokenUser = await db.collection('uni-id-users')
					.where({ 
						token: checkToken
					})
					.get()
				
				if (tokenUser.data.length === 0) {
					return {
						errCode: 10006,
						errMsg: 'token无效或已过期'
					}
				}
				
				result = {
					errCode: 0,
					errMsg: 'token有效',
					userInfo: {
						userId: tokenUser.data[0]._id,
						username: tokenUser.data[0].username,
						nickname: tokenUser.data[0].nickname,
						mobile: tokenUser.data[0].mobile
					}
				}
				break
				
			case 'logout':
				// 用户登出
				const { token: logoutToken } = params
				
				if (logoutToken) {
					await db.collection('uni-id-users')
						.where({ token: logoutToken })
						.update({ token: [] })
				}
				
				result = {
					errCode: 0,
					errMsg: '登出成功'
				}
				break
				
			default:
				result = {
					errCode: 403,
					errMsg: '非法访问'
				}
		}
	} catch (error) {
		console.error('云函数执行错误:', error)
		result = {
			errCode: -1,
			errMsg: '服务器错误：' + error.message
		}
	}
	
	return result
}
