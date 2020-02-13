$(function() {

	var questionSum = 8; //题目总数
	var questionCount = 5.0; //抽得题目数
	var everyScore = 100.0 / questionCount; //每题分数

	var allQuestion = []
	var currentQuestion = []
	var count = 0
	var countTime = 10
	var isConfirm = false
	var score = 0

	var allQuestion = [{
			"answer": 2,
			"options": [
				"甲类甲类",
				"乙类甲类",
				"甲类乙类",
				"乙类乙类"
			],
			"quiz": "《中华人民共和国传染病防治法》规定管理的传染病分甲、乙、丙三类，原有39种。甲类传染病是指传染性强、病死率高、易引起大流行的烈性传染病。2020年1月20日，经国务院批准。新型冠状病毒感染的肺炎新纳入《中华人民共和国传染病防治法》规定的(传染病，采取( )传染病的防控措施进行管理。"
		},

		{
			"answer": 1,
			"options": [
				"会,具备在人与人之间传播的能力",
				"不会,主要是动物之间的传播"
			],
			"quiz": "新型冠状病毒会人传人吗?"
		},

		{
			"answer": 1,
			"options": [
				"14天",
				"21天",
				"2-3天",
				"7天"
			],
			"quiz": "与新型冠状病毒患者近距离接触过,需要隔离多少天?"
		},

		{
			"answer": 3,
			"options": [
				"深色面朝内,浅色面朝外",
				"为了节约使用,两面轮流戴",
				"将折面完全展开,完全包住嘴、品下颌，使口罩与面部完全贴合",
				"将有金属条的一端戴在下方"
			],
			"quiz": "怎样正确戴口罩? "
		},

		{
			"answer": 2,
			"options": [
				"密闭门窗",
				"确保室内空气流通，每周至少清洁家居环境一次",
				"用普通清洁剂清洗受污染处",
				"使用废旧抹布清除污垢"
			],
			"quiz": "在家该如何预防新型冠状病毒感染?"
		},

		{
			"answer": 2,
			"options": [
				"能，食用醋有杀菌消毒效果",
				"不能，食用醋所含醋酸浓度很低，达不到消毒效果，同时易对人的眼睛和呼吸道造成刺激"
			],
			"quiz": "室内用食用福像杀灭新理冠状病毒吗?"
		},

		{
			"answer": 2,
			"options": [
				"能，磷酸奥司他韦是抗病毒药物，网络上也流传着这药方",
				"不能里然品酸美司他韦是抗聘电药物，目前没有证规显示共能够须新型冠状购南感决"
			],
			"quiz": "吃抗病毒药物，如碳酸奥司他韦等能预防新型冠状病毒感染吗?"
		},

		{
			"answer": 4,
			"options": [
				"能，这是发烧感冒时最管用的药",
				"不能，新型冠状病毒感染的肺炎病原体是病毒，而抗生素针对的是细菌。"
			],
			"quiz": "吃抗生素能预防新型冠状病毒感染吗?"
		}


	]

	$('.startBtn').click(() => {
		$('.startPage').fadeOut(500)
		alert("共" + questionCount + "题,每题" + everyScore + "分");
		getCurrentQuestion()
		insertItem(currentQuestion)
		timer();
	})

	var timer = () => {
		setInterval(() => {
			$('.time').html(
				`<div class="remainder-time">剩余时间: ${countTime}</div>
											 <div class="remainder-question">剩余题目: ${questionCount-count}</div>`
			)
			countTime--
			$('.answer').on('click', (e) => {
				if (e.target.className == "item") {
					countTime = 10
				}
			})
			if (countTime == 0) {
				countTime = 10
				count++;
				if (count < questionCount)
					nextQuestion()
				else {
					getScore()
				}
			}
		}, 1000)
	}

	//获取题目
	var getCurrentQuestion = () => {
		var newQuestion = [];
		var arr = new Array(questionCount);
		for (var a = 0; a < arr.length; a++) {
			arr[i] = 0;
		}
		for (var i = 0; i < questionCount; i++) {
			var randomNum = parseInt((Math.random() * 10) % questionSum);
			while (arr[randomNum] == 1) {
				randomNum = parseInt((Math.random() * 10) % questionSum);
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
		for (var i = 0; i < dataOptions.length; i++) {
			$('.answer').append(`
					<button class="item" data-index="${i+1}">${dataOptions[i]}</button>
			`)
		}
	}

	//显示点击的答案
	var showAnswer = (e) => {
		var que = currentQuestion[count];
		if (e.target.dataset.index == que.answer) {
			$(e.target).delay("1000").css({
				backgroundColor: 'springgreen'
			})
			score += everyScore;
		} else {
			$(e.target).delay("1000").css({
				backgroundColor: 'red'
			});
			alert("答错啦! 正确答案为:" + que.options[que.answer - 1]);

		}
	}


	//显示分数
	var getScore = () => {
		alert("你的分数是" + score);

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
		if (e.target.className == "item") {
			if (!isConfirm) {
				showAnswer(e)
				count++;
				if (count < questionCount) {
					setTimeout(() => {
						nextQuestion()
					})
				} else if (count == questionCount) {
					setTimeout(() => {
						getScore();
					})
				}
			}
			isConfirm = true;
		}
	})


})
