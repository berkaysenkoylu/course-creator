const updateQuestionaireState = (data) => {
    let questionConfig = {
        commonConfig: {
            questionNumber: data.questionNumber || 0,
            text: data.text || '',
            type: data.type || '',
            elementType: data.elementType || '',
            validation: data.validation || {}
        },
        specificConfig: {
            value: '',
            choices: [],
            sliderStep: 10,
            subText: []
        }
    };

    switch(data.type || '') {
        case 'text':
        case 'number':
            questionConfig.specificConfig['value'] = data.value || '';
            break;
        case 'multiple-choice':
            questionConfig.specificConfig['choices'] = data.choices || [];
            break;
        case 'slider':
            questionConfig.specificConfig['value'] = data.value || 0;
            questionConfig.specificConfig['sliderStep'] = data.sliderStep || 5;
            break;
        case 'slider-combination':
            questionConfig.specificConfig['subTexts'] = data.subTexts || {};
            break;
        default:
            break;
    }
    
    return questionConfig;
}

export default updateQuestionaireState;