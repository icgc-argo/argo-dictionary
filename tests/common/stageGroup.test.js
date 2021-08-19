/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

const validation = require('./../../references/validationFunctions/common/stageGroup.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const dummy = require('../constructDummyData');
const specimen = require('../constructDummyData').getSchemaDummy('specimen');
const primary_diagnosis = require('../constructDummyData').getSchemaDummy('primary_diagnosis');
const follow_up = require('../constructDummyData').getSchemaDummy('follow_up');

// the name of the field being validateds

const unitTests = {
 Specimen: [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'revised international staging system (riss)',
        pathological_stage_group: 'stage ii',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "lugano staging system", stage group does not belong to this staging system"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'lugano staging system',
        pathological_stage_group: 'stage a',
      }),
      name: 'pathological_stage_group',
    }, 
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'St Jude staging System',
        pathological_stage_group: 'Stage III',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'Ann Arbor Staging System',
        pathological_stage_group: 'stage IiIA',
      }),
      name: 'pathological_stage_group',
    }
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: ' rai Staging syStem ',
        pathological_stage_group: ' stage 0 ',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: ' Durie-salmon Staging syStem ',
        pathological_stage_group: ' stage iiB',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'FIGO Staging syStem ',
        pathological_stage_group: 'stage iAB ',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: ' binEt stAging SYSTEM',
        pathological_stage_group: 'stAge C ',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'AJCC 8th Edition',
        pathological_stage_group: 'STAGE IB1',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'AJCC 7th edition',
        pathological_stage_group: 'occult Carcinoma',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'AJCC 7th edition',
        pathological_stage_group: 'occult Carcinoma',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'AJCC 7th edition',
        pathological_stage_group: ' an impermissable VALUE!!! ',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "Binet staging system", stage group is value from another codelist: "Stage I"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'Binet staging system',
        pathological_stage_group: 'Stage I',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'Rai staging system',
        pathological_stage_group: 'iii',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'ajcc 8th edition',
        pathological_stage_group: '         ',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'ajcc 8th edition',
        pathological_stage_group: 'gibberish!',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'ann arbor staging system',
        pathological_stage_group: 'any text',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'Staging system undefined but stage group submitted',
    false,
    {
      row: loadObjects(specimen, {
        pathological_stage_group: 'stage i',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'staging system undefined',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: '',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'staging system submitted but stage group undefined',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'Lugano staging system',
      }),
      name: 'pathological_stage_group',
    },
  ],
  [
    'staging system and stage group undefined',
    true,
    {
      row: loadObjects(specimen, {}),
      name: 'pathological_stage_group',
    },
  ],
 ],
 'Primary Diagnosis': [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'revised international staging system (riss)',
        clinical_stage_group: 'stage ii',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "lugano staging system", stage group is: "stage iva"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'lugano staging system',
        clinical_stage_group: 'stage iva',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'St Jude staging System',
        clinical_stage_group: 'Stage III',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'Ann Arbor Staging System',
        clinical_stage_group: 'stage IiIA',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: ' rai Staging syStem ',
        clinical_stage_group: ' stage 0 ',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: ' Durie-salmon Staging syStem ',
        clinical_stage_group: ' stage iiB',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'FIGO Staging syStem ',
        clinical_stage_group: 'stage iAB ',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: ' binEt stAging SYSTEM',
        clinical_stage_group: 'stAge C ',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 8th Edition',
        clinical_stage_group: 'STAGE IB1',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 7th edition',
        clinical_stage_group: 'occult Carcinoma',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 7th edition',
        clinical_stage_group: 'occult Carcinoma',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 7th edition',
        clinical_stage_group: ' an impermissable VALUE!!! ',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "Binet staging system", stage group is from another codelist"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'Binet staging system',
        clinical_stage_group: 'Stage I',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'Rai staging system',
        clinical_stage_group: 'iii',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'ajcc 8th edition',
        clinical_stage_group: '         ',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'ajcc 8th edition',
        clinical_stage_group: 'gibberish!',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'ann arbor staging system',
        clinical_stage_group: 'any text',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system set to an unexpected value, stage group is any text"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'my staging system',
        clinical_stage_group: 'any text here',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Stage group cannot be assessed when clinical_t_category is not TX or clinical_n_category is not NX"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 8th Ed.',
        clinical_stage_group: 'Cannot be assessed',
        clinical_t_category: 'T2',
        clinical_n_category: 'N2',
        clinical_m_category: 'M1'
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Stage group cannot be assessed when clinical_t_category is TX"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'AJCC 8th Ed.',
        clinical_stage_group: 'Cannot be assessed',
        clinical_t_category: 'TX',
        clinical_n_category: 'N1',
        clinical_m_category: 'M1'
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'Staging system undefined',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_stage_group: 'any text here',
      }),
      name: 'clinical_stage_group'
    },
  ],
  [
    'staging system undefined',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: '',
      }),
      name: 'clinical_stage_group'
    },
  ]
 ],
 'Post-Therapy' : [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'revised international staging system (riss)',
        posttherapy_stage_group: 'stage ii',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "lugano staging system", stage group is: "stage iva"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'lugano staging system',
        posttherapy_stage_group: 'stage iva',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'St Jude staging System',
        posttherapy_stage_group: 'Stage III',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'Ann Arbor Staging System',
        posttherapy_stage_group: 'stage IiIA',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: ' rai Staging syStem ',
        posttherapy_stage_group: ' stage 0 ',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: ' Durie-salmon Staging syStem ',
        posttherapy_stage_group: ' stage iiB',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'FIGO Staging syStem ',
        posttherapy_stage_group: 'stage iAB ',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: ' binEt stAging SYSTEM',
        posttherapy_stage_group: 'stAge C ',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'AJCC 8th Edition',
        posttherapy_stage_group: 'STAGE IB1',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'AJCC 7th edition',
        posttherapy_stage_group: 'occult Carcinoma',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'AJCC 7th edition',
        posttherapy_stage_group: 'occult Carcinoma',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    {    
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'AJCC 7th edition',
        posttherapy_stage_group: ' an impermissable VALUE!!! ',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "Binet staging system", stage group is value from another codelist',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'Binet staging system',
        posttherapy_stage_group: 'Stage I',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'Rai staging system',
        posttherapy_stage_group: 'iii',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'ajcc 8th edition',
        posttherapy_stage_group: '         ',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'ajcc 8th edition',
        posttherapy_stage_group: 'gibberish!',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'ann arbor staging system',
        posttherapy_stage_group: 'any text',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system set to an unexpected value, stage group is any text"',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: 'my staging system',
        posttherapy_stage_group: 'any text here',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'Staging system undefined',
    false,
    {
      row: loadObjects(follow_up, {
        posttherapy_stage_group: 'any text here',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
  [
    'staging system undefined',
    true,
    {
      row: loadObjects(follow_up, {
        posttherapy_tumour_staging_system: '',
      }),
      name: 'posttherapy_stage_group',
    }
  ],
 ],
 'Recurrence': [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'revised international staging system (riss)',
        recurrence_stage_group: 'stage ii',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "lugano staging system", stage group is: "stage iva"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'lugano staging system',
        recurrence_stage_group: 'stage iva',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'St Jude staging System',
        recurrence_stage_group: 'Stage III',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'Ann Arbor Staging System',
        recurrence_stage_group: 'stage IiIA',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: ' rai Staging syStem ',
        recurrence_stage_group: ' stage 0 ',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: ' Durie-salmon Staging syStem ',
        recurrence_stage_group: ' stage iiB',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'FIGO Staging syStem ',
        recurrence_stage_group: 'stage iAB ',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: ' binEt stAging SYSTEM',
        recurrence_stage_group: 'stAge C ',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'AJCC 8th Edition',
        recurrence_stage_group: 'STAGE IB1',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'AJCC 7th edition',
        recurrence_stage_group: 'occult Carcinoma',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'AJCC 7th edition',
        recurrence_stage_group: 'occult Carcinoma',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'AJCC 7th edition',
        recurrence_stage_group: ' an impermissable VALUE!!! ',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "Binet staging system", stage group is value from another codelist',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'Binet staging system',
        recurrence_stage_group: 'Stage I',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'Rai staging system',
        recurrence_stage_group: 'iii',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'ajcc 8th edition',
        recurrence_stage_group: '         ',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'ajcc 8th edition',
        recurrence_stage_group: 'gibberish!',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'ann arbor staging system',
        recurrence_stage_group: 'any text',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system set to an unexpected value, stage group is any text"',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: 'my staging system',
        recurrence_stage_group: 'any text here',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'Staging system undefined',
    false,
    {
      row: loadObjects(follow_up, {
        recurrence_stage_group: 'any text here',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'staging system undefined',
    true,
    {
      row: loadObjects(follow_up, {
        recurrence_tumour_staging_system: '',
      }),
      name: 'recurrence_stage_group',
    }
  ],
  [
    'both undefined', 
    true, 
    {
      row: loadObjects(follow_up,{}),
      name: 'recurrence_stage_group',
    }
  ],
 ]
};

describe('Common Tests', () => {
  Object.entries(unitTests).forEach(schema => {
    schema[1].forEach(testSuite => {
      const testIndex = 2;
      const testInputs = testSuite[testIndex];
      universalTest(validation()({$row: testInputs, $name: name, $field: testInputs[name]}));
    });
  });
});


describe('Unit Tests for Stage Group script', () => {
  // Using .each to reduce repetition. Each array entry is its own test.
  // Entry 0: Used as test description
  // Entry 1: The target result.
  // Entry 2: The object containing the inputs to the validate function.

  // the index for accessing the name of the type of unit tests what will run
  const nameIndex = 0;
  // the index for accessing the array of arrays that hold the test information
  const testsIndex = 1;

  Object.entries(unitTests).forEach(schema => {
    describe(`${schema[nameIndex]} Tests`, () => {
      test.each(schema[testsIndex])(
        '\n Test %# : %s \nExpecting result.valid to be: %s',
        (description, target, inputs) => {
          const scriptOutput = validation()({ $row: inputs.row, $name: inputs.name, $field: inputs.row[inputs.name]});
          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
