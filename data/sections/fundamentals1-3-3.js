HR.registerSection({
 "id": "fundamentals1-3-3",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-3-3-o1",
   "description": "Explain the agent, environment, action, and reward loop and its trade-offs.",
   "pages": [
    27,
    27
   ]
  }
 ],
 "notes": [
  {
   "heading": "Learning from consequences",
   "pages": [
    27,
    27
   ],
   "bullets": [
    "The behaviorist account focuses on an intelligent agent interacting with an environment. A policy guides behavior; consequences produce reward or punishment, and the agent adjusts its behavior accordingly.",
    "The source connects this view with reinforcement learning, Q-learning, and policy-gradient methods. Its examples include games, robots, drones, and autonomous driving. These examples illustrate interaction, not a claim that each system uses only one school of AI.",
    "Strengths include adaptation to the environment and attention to outcomes. Trial and error can also be expensive or dangerous, and optimizing a reward is not automatically the same as satisfying every human value.",
    "Worked application: a simulated delivery agent receives feedback for reaching a destination. Before transferring its behavior to a physical robot, examine what the reward encouraged and what unsafe behavior the simulation may have omitted."
   ],
   "objectiveIds": [
    "fundamentals1-3-3-o1"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-3-3-pre-01",
    "type": "single",
    "stem": "Which feedback most directly defines the behaviorist learning loop on the source slide?",
    "options": [
     {
      "key": "A",
      "text": "An explicit rule supplied before every action"
     },
     {
      "key": "B",
      "text": "A target label supplied for every training example"
     },
     {
      "key": "C",
      "text": "A reward or punishment following behavior"
     },
     {
      "key": "D",
      "text": "A similarity score between unlabeled input features"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The diagram links agent behavior to reward and punishment, which influence later behavior. The other quantities are not its learning feedback.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-3-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-3-3-post-01",
    "type": "multi",
    "stem": "Which statements match the source's behaviorist view? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "An agent interacts with an environment"
     },
     {
      "key": "B",
      "text": "Outcomes can influence later behavior"
     },
     {
      "key": "C",
      "text": "Trial and error can carry cost and risk"
     },
     {
      "key": "D",
      "text": "A policy is necessarily an explicit theorem prover"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "Environment interaction and outcome feedback define the view, and the slide notes trial-and-error costs. A policy need not be a symbolic theorem prover.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-3-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-3-3-summative-01",
    "type": "tf",
    "stem": "An agent that maximizes its reward has thereby demonstrated that every possible human ethical concern was included in that reward.",
    "options": [
     {
      "key": "T",
      "text": "True"
     },
     {
      "key": "F",
      "text": "False"
     }
    ],
    "answer": [
     "F"
    ],
    "explanation": "The slide emphasizes outcome-driven behavior and the risks of trial and error. Reward optimization by itself does not establish completeness of the objective.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-3-o1"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-1",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
