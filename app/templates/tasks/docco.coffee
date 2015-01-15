# 生成文档工具
# http://jashkenas.github.io/docco/

module.exports = (grunt) ->

	config = grunt.config.get "config"

	grunt.registerTask "doc", [
		"docco"
	]

	grunt.registerTask "docs", ["doc"]

	# 去除coffee生成的js文件
	getDoccoFiles = ->
		files = []
		ret = []
		grunt.file.recurse "#{config.app}/scripts", (abspath, rootdir, subdir, filename) ->
			files.push abspath unless "#{subdir}".match /^\.tmp|docs/

		files.forEach (file, index) ->
			if file.match /\.js$/
				coffeeFile = file.replace /\.js$/, ".coffee"
				if coffeeFile in files
					ret.push coffeeFile
				else
					ret.push file

		ret

	


	docco:
		script:
			# src: [
			# 	'<%= config.app %>/scripts/**/*.js'
			# 	'!<%= config.app %>/scripts/.tmp/*.js'
			# ]
			src: getDoccoFiles()
			options:
				output: '<%= config.doc %>'

	connect:
    docs: 
      options: 
      	# https://github.com/gruntjs/grunt-contrib-connect
      	# base可以传Object，貌似不管用
      	# grunt-contrib-connect 0.9.0以上版本管用
        base: 
        	path: '<%= config.doc %>'
	        options:
	        	index: "app.html"
        livereload: false

