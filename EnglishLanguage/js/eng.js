//check the existence of the word in database
	//currentWord: the word that user entered
	//database: list of the word in database
	//flag: 
	//+ 1 find word like the entered
	//+ 2 find the exact word
	function checkExist(currentWord, database, flag)
	{
		var isRightWord = false;
		var indexOfMatchWord = [];
		//traverse all the word in database
		$.each(database, function(index, value){			
			//find the index of the word entered in database
			if(value.word == currentWord && flag == 2)
			{
				indexOfMatchWord.push(index);
				isRightWord = true;
			}
			//find the index of the word like the entered
			if(value.word.indexOf(currentWord.trim(' ')) != -1 && flag == 1)
			{
				$("#inputTest").css("color", 'blue');
				isRightWord = true;
				indexOfMatchWord.push(index);
			}
		});
		//could not found the word
		if(!isRightWord)
		{
			$("#inputTest").css("color", 'red');
			return indexOfMatchWord;
		}
		return indexOfMatchWord;
	}
	
	//random a number in range
	function random(range)
	{
		return Math.floor(Math.random() * range);
	}
	var value = "";
	//function change range of word to test
	function changeRangeTest(mode, wordOnSteps)
	{
		var rangeBegin = 0;
		var rangeEnd = 0;
		var step = parseInt(mode);			
		if(step == 0)
		{
			tempWordObject = dataWordObject.slice(0, dataWordObject.length);
			value = "";
		}
		else if(step == -1)
		{	
			if(value == "")
			{
				value = prompt("enter the range you want to test: ext: 1-3");
				value = value.split('-');
				while(isNaN(parseInt(value[0])) && isNaN(parseInt(value[1])))
				{
					value = prompt("reEnter the range you want to test: ext: 1-3");
					value = value.split('-');
				}
			}
			
			rangeBegin = wordOnSteps*(parseInt(value[0]) - 1);
			rangeEnd = rangeBegin + wordOnSteps*(parseInt(value[1]) - parseInt(value[0]) + 1);
			tempWordObject = dataWordObject.slice(rangeBegin, rangeEnd);
		}
		else
		{
			value = "";
			rangeBegin = wordOnSteps*(step - 1);
			rangeEnd = rangeBegin + wordOnSteps;
			tempWordObject = dataWordObject.slice(rangeBegin, rangeEnd);
		}
		 	
		 
		$("#showArea").html("");		
		randomIndex = random(tempWordObject.length);
		$("#randomWord").html(tempWordObject[randomIndex].meaning);
		changeModeViewWord(tempWordObject, $("#modeViewWords").val());		
	}
	
	//function change mode view the list of words
	function changeModeViewWord(database, mode)
	{
		switch(mode)
		{
			case "1":
				$("#showArea").html("");
				var numberObjectInLine = 0;
				var initTable = "<table style='width:100%'>";
				initTable = initTable + "<tr>";
				$.each( database, function( index, value )
				{
					numberObjectInLine++;
					var indexes = checkExist(value.word, dataWordObject, 2);
					initTable = initTable + "<td align='center' class='labelClassCSS" + numberObjectInLine + "'>";
					var label = "<label class='labelCSS" + indexes + "' title='" + value.meaning + "'>" + value.word + "</label></td>";
					initTable = initTable + label;
					if(numberObjectInLine == 3)
					{
						initTable = initTable + "</tr><tr>";
						numberObjectInLine = 0;
					}						
				});		
				if(dataWordObject.length%3!=0)
				{
					initTable = initTable + "</tr><br/>";
				}
				initTable = initTable +  "</table><br/>";
				$("#showArea").append(initTable);
				break;
			case "2":
				$("#showArea").html("");
				var initTable = "<table style='width:100%'>";
				$.each( database, function( index, value )
				{
					var indexes = checkExist(value.word, dataWordObject, 2);
					initTable = initTable + "<tr>";
					//create column words
					initTable = initTable + "<td align='center' class='viewMode2CSS1'>";
					var label = "<label class='labelCSS" + indexes + "'>" + value.word + "</label></td>";
					initTable = initTable + label;
					//create column type
					initTable = initTable + "<td align='center' class='viewMode2CSS2'>";
					var label = "<label class='labelCSS" + indexes + "'>" + value.type + "</label></td>";
					initTable = initTable + label;
					//create column meaning
					initTable = initTable + "<td align='left' class='viewMode2CSS3'>";
					var label = "<label class='labelCSS" + indexes + "'>" + value.meaning + "</label></td>";
					initTable = initTable + label;
					
					initTable = initTable + "</tr>";					
				});						
				initTable = initTable +  "</table><br/>";
				$("#showArea").append(initTable);
				break;
			default:
				break;
		}
	}
	
	//use like string.Format in C#
	var format = function (str, col) {
		col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

		return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
			if (m == "{{") { return "{"; }
			if (m == "}}") { return "}"; }
			return col[n];
		});
	};
		
	function convertData(data, mode)
	{
		var convertDatas = [];
		switch(mode){
			case 1: 	//english
			$.each(data, function(index, value)
			{
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});
				break;
			case 2:		//vietnamese
			$.each(data, function(index, value)
			{
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});
				break;
			case 3:		//kanji-hira
			$.each(data, function(index, value)
			{
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});
				break;
			case 4:		//kanji-vietmanese
			$.each(data, function(index, value)
			{
				if(isNeedConvert){
					var meaning = value.example;
					var example = value.meaning;
					value.meaning = meaning;
					value.example = example;
				}
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});		
			isNeedConvert = false;
				break;
			case 5:		//hira-kanji
			$.each(data, function(index, value)
			{
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});
				break;
			case 6:		//vietnamese-kanji
			$.each(data, function(index, value)
			{
				if(isNeedConvert){
					var meaning = value.example;
					var example = value.meaning;
					value.meaning = meaning;
					value.example = example;
				}
				var meanings = value.word;
				var words = value.meaning;
				value.word = words;
				value.meaning = meanings;
				
				convertDatas.push(value);
			});	
			isNeedConvert = false;			
				break;
			default:
				break;
		}
		return convertDatas;
	}
	
	//create a select element and append into DOM object
	function addSelectRanges(database, wordEachStep, DOM)
	{
		var numberOfElement = 1;
		var length = database.length;
		if((length % wordEachStep) > (wordEachStep/2))
		{
			numberOfElement = (length + (wordEachStep - length % wordEachStep)) / wordEachStep;
		}
		else
		{
			numberOfElement = (length - length % wordEachStep) / wordEachStep;
		}
		var htmlValue = "<select id='selectRange'>";
		htmlValue = htmlValue + "<option value = '0'> all words </option>";
		htmlValue = htmlValue + "<option value = '-1'> choose range </option>";
		for(var index = 1; index < numberOfElement + 1; index++)
		{
			htmlValue = htmlValue + format("<option value = '{0}'> {1} </option>",index, index);
		}
		
		htmlValue = htmlValue + "</select>";
		
		DOM.append(htmlValue);
		return $("#selectRange");
	}