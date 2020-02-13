$(function(){
	
	var questionSum = 8; //题目总数
	var questionCount = 5.0;//抽得题目数
	var everyScore = 100.0/questionCount;//每题分数

	var allQuestion = []
	var currentQuestion = []
	var count = 0
	var countTime = 10
	var isConfirm = false
	var score = 0
	

	
	$.ajax({
		url: 'js/dati.json',
		type: "POST",
		dataType: "json", //返回数据格式为json
		success:function(data){
			allQuestion = data
		},
		error:function(xhr,type,errorThrown){
			alert("加载题库失败!")
		}
	});
	
	
	
	$('.startBtn').click(()=>{
		$('.startPage').fadeOut(500)
		alert("共"+questionCount+"题,每题"+everyScore+"分");
		getCurrentQuestion()
		insertItem(currentQuestion)
		timer();
	})
	
	var timer = () => {
		setInterval(() => {
			$('.time').html(`<div class="remainder-time">剩余时间: ${countTime}</div>
											 <div class="remainder-question">剩余题目: ${questionCount-count}</div>`)
			countTime--
			$('.answer').on('click',(e) => {
				if(e.target.className == "item"){
					countTime = 10
				}
			})
			if(countTime == 0){
				countTime = 10
				count++;
				if(count < questionCount)
					nextQuestion()
				else{
					getScore()
				}
			}
		},1000)
	}
		
	//获取题目
	var getCurrentQuestion = () => {
		var newQuestion = [];
		var arr =new Array(questionCount);
		for(var a=0; a<arr.length; a++){
			arr[i] = 0;
		}
		for(var i = 0;i<questionCount;i++){
			var randomNum = parseInt((Math.random()*10)%questionSum);
			while(arr[randomNum]==1){
				randomNum = parseInt((Math.random()*10)%questionSum);			
			}
			newQuestion.push(allQuestion[randomNum]);
			arr[randomNum] = 1;
			currentQuestion = newQuestion;
		}
	}
	
	
	//渲染题目和答案
	var insertItem = (data) => {
		$('.question').html(`
				${data[count].quiz}
		`)
		var dataOptions = data[count].options;
		for(var i = 0;i<dataOptions.length;i++){
			$('.answer').append(`
					<button class="item" data-index="${i+1}">${dataOptions[i]}</button>
			`)
		}
	}
	
	//显示点击的答案
	var showAnswer = (e) => {
		var que = currentQuestion[count];
		if(e.target.dataset.index == que.answer){
			$(e.target).delay("1000").css({backgroundColor:'springgreen'})
			score+=everyScore;
		}else{
			$(e.target).delay("1000").css({backgroundColor:'red'});
			alert("答错啦! 正确答案为:"+que.options[que.answer-1]);
			
		}
	}
	
	
	//显示分数
	var getScore = () => {
		alert("你的分数是"+score);
		
		$('.gamePage').fadeOut(300);
		window.location.reload();
	}
	
	
	//获得下一问题
	var nextQuestion = () => {
		$('.question').html("");
		$('.answer').html("");
		insertItem(currentQuestion);
		isConfirm = false;
	}
	
	$('.answer').click((e) => {
		if(e.target.className == "item"){
			if(!isConfirm){
				showAnswer(e)
				count++;
				if(count < questionCount){
					setTimeout(() => {
						nextQuestion()
					})
				}else if(count == questionCount){
					setTimeout(() => {
						getScore();
					})
				}
			}
			isConfirm = true;
		}
	})
	
	
})