<template>
  <div class="region">
    <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data'
    //import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
    export default{
        name: 'region',
        data () {
            return {
                options: regionData,
                selectedOptions: [],
                areaName: '',
                area_id: [],
            }
        },
        methods: {
            handleChange: function(value) {
                this.area_id = value;
                this.areaName = CodeToText[this.selectedOptions[0]] + '' + CodeToText[this.selectedOptions[1]] + '' + CodeToText[this.selectedOptions[2]];
                this.$emit("selecRregion", this.areaName, this.area_id);
            }
        }
    }
</script>