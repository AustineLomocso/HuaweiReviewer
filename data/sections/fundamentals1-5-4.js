HR.registerSection({
 "id": "fundamentals1-5-4",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-5-4-o1",
   "description": "Identify data-collection, consent, and transparency concerns in AI applications.",
   "pages": [
    35,
    35
   ]
  }
 ],
 "notes": [
  {
   "heading": "Data use is part of the application design",
   "pages": [
    35,
    35
   ],
   "bullets": [
    "AI systems may use voice, behavior, and biometric data. Convenience can conceal collection and reuse that users do not understand or explicitly consent to.",
    "The source connects transparency to people's autonomy over their data. A useful feature does not by itself justify every collection or downstream use.",
    "Worked application: when reviewing a voice-enabled device, distinguish the useful recognition function from what audio is collected, why it is retained, and whether users understand the uses. This is an ethical analysis of the supplied lesson, not a claim about current legal requirements."
   ],
   "objectiveIds": [
    "fundamentals1-5-4-o1"
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
    "id": "fundamentals1-5-4-pre-01",
    "type": "tf",
    "stem": "A convenient AI feature can still create privacy concerns through unclear collection and reuse of personal data.",
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
     "T"
    ],
    "explanation": "The source explicitly contrasts convenience with privacy risks and lack of transparency.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-4-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-5-4-post-01",
    "type": "single",
    "stem": "A smart device collects voice recordings for undisclosed commercial analysis. Which issue is most directly illustrated?",
    "options": [
     {
      "key": "A",
      "text": "A mismatch between training and inference batch sizes"
     },
     {
      "key": "B",
      "text": "Loss of transparency and user control over personal data"
     },
     {
      "key": "C",
      "text": "A guaranteed failure of speech recognition"
     },
     {
      "key": "D",
      "text": "A shortage of symbolic inference rules"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The source's concern is undisclosed collection and use of personal data. Recognition accuracy or model architecture does not settle that privacy issue.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-4-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-5-4-summative-01",
    "type": "multi",
    "stem": "Which questions are relevant to the privacy concern described? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "What personal information is collected?"
     },
     {
      "key": "B",
      "text": "Do users understand how it will be used?"
     },
     {
      "key": "C",
      "text": "Was explicit consent absent in the described collection?"
     },
     {
      "key": "D",
      "text": "Does faster processing alone establish permission for reuse?"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "Collection, transparency, and consent relate directly to the source example. Processing speed does not establish permission for additional uses.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-4-o1"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-4",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
