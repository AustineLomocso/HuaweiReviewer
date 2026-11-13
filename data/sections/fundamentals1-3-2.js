HR.registerSection({
 "id": "fundamentals1-3-2",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-3-2-o1",
   "description": "Trace neural learning and distinguish learned capability from its risks.",
   "pages": [
    26,
    26
   ]
  }
 ],
 "notes": [
  {
   "heading": "Training versus use of a learned network",
   "pages": [
    26,
    26
   ],
   "bullets": [
    "Connectionism models cognitive functions through networks inspired by connected neurons. The source lists MLPs, CNNs, LSTMs, Transformers, and related models as examples rather than a single fixed architecture.",
    "In the training diagram, input passes through the network to produce an output. The objective is compared with that output to obtain error or loss, which feeds the learning algorithm. In the application diagram, a learned network produces predictions for inputs.",
    "Learning from data supports adaptation and high-dimensional representations. It also creates risks: overfitting, poor robustness, bias, high computational cost, and difficult interpretation.",
    "Worked application: an image classifier may perform well on familiar images yet fail on a new camera environment. Check data coverage and robustness rather than treating the neural architecture as a guarantee of reliable generalization."
   ],
   "objectiveIds": [
    "fundamentals1-3-2-o1"
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
    "id": "fundamentals1-3-2-pre-01",
    "type": "single",
    "stem": "In the source's neural training diagram, what connects a predicted output to improvement of the model?",
    "options": [
     {
      "key": "A",
      "text": "A loss or error evaluated against the objective"
     },
     {
      "key": "B",
      "text": "A manually written proof for every possible output"
     },
     {
      "key": "C",
      "text": "A fixed rule forbidding parameter changes"
     },
     {
      "key": "D",
      "text": "A guarantee that each prediction is already correct"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "The diagram compares output with an objective and feeds error/loss into the training process. Predictions are not assumed correct before evaluation.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-2-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-3-2-post-01",
    "type": "multi",
    "stem": "Which limitations of connectionist methods are named on the slide? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Poor interpretability"
     },
     {
      "key": "B",
      "text": "Overfitting risk"
     },
     {
      "key": "C",
      "text": "No ability to adapt from data"
     },
     {
      "key": "D",
      "text": "Absence of computational cost"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "The slide lists poor interpretability and overfitting, alongside cost and robustness risks. Adaptation from data is a strength, and computational cost is not absent.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-2-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-3-2-summative-01",
    "type": "tf",
    "stem": "A neural network's strong performance on familiar examples eliminates the need to consider bias and robustness.",
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
    "explanation": "The source explicitly includes bias and robustness among connectionist limitations. Strong observed performance does not remove those concerns.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-2-o1"
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
