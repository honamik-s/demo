var repo_site = "https://honamik-s.github.io/demo/";
  
/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome = {
  type: "html-keyboard-response",
  stimulus: "スペースキーを押すと実験を開始できます。"
};
timeline.push(welcome);

/* define instructions trial */
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>この実験では画面の中央に円が表示されます。 </p>" +
      "<p>もし円が <strong>青なら</strong>、Fキーを押してください。</p>" +
      "<p>もし円が <strong>オレンジなら</strong>、Jキーを押してください。</p>" +
      "<div style='width: 700px;'>"+
      "<div style='float: left;'><img src='" + repo_site + "img/blue.png'></img>" +
      "<p class='small'><strong>Fキーを押してください</strong></p></div>" +
      "<div class='float: right;'><img src='" + repo_site + "img/orange.png'></img>" +
      "<p class='small'><strong>Jキーを押してください</strong></p></div>" +
      "</div>"+
      "<p>スペースキーを押すと実験を開始できます。</p>",
  post_trial_gap: 2000
};
timeline.push(instructions);

/* test trials */
var test_stimuli = [
  { stimulus: repo_site + "img/blue.png", 
    data: {test_part: 'test', correct_response: 'f'}},
  { stimulus: repo_site + "img/orange.png", 
    data: {test_part: 'test', correct_response: 'j'}}
];

var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
  data: {test_part: 'fixation'}
}

var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    }
}

var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
  repetitions: 5
}

timeline.push(test_procedure);