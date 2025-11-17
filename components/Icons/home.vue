<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 120.031 70.627">
    <g id="Group_123" data-name="Group 123" transform="translate(-1395.969 -750.948)">
      <g id="Group_119" data-name="Group 119">
        <g id="Group_117" data-name="Group 117">
          <g id="Group_106" data-name="Group 106">
            <rect id="Rectangle_38" data-name="Rectangle 38" class="cls-1" width="1.844" height="26.303" transform="translate(1484.307 794.094)"/>
          </g>
          <g id="Group_107" data-name="Group 107">
            <path id="Path_62" data-name="Path 62" class="cls-1"
            d="M1452.347,821.575h-49.021V782.58l15.837-17.886h47.972l8.252,
            8.195-1.3,1.308-7.709-7.659h-46.383l-14.824,16.741v36.452H1450.5v-36.8h1.844Z"/>
          </g>
          <g id="Group_110" data-name="Group 110">
            <g id="Group_108" data-name="Group 108">
              <path id="Path_63" data-name="Path 63" class="cls-1"
              d="M1424.881,801.89H1415.6v-9.281h9.282Zm-7.438-1.844h5.594v-5.593h-5.594Z"/>
            </g>
            <g id="Group_109" data-name="Group 109">
              <path id="Path_64" data-name="Path 64" class="cls-1"
              d="M1440.07,801.89h-9.28v-9.281h9.28Zm-7.436-1.844h5.592v-5.593h-5.592Z"/>
            </g>
          </g>
          <g id="Group_111" data-name="Group 111">
            <path id="Path_65" data-name="Path 65" class="cls-1"
            d="M1475.572,821.319h-14.49V798.525a4.94,4.94,0,0,1,
            4.934-4.936h4.622a4.941,4.941,0,0,1,4.934,
            4.936Zm-12.646-1.844h10.8v-20.95a3.094,3.094,0,0,
            0-3.09-3.092h-4.622a3.094,3.094,0,0,0-3.09,3.092Z"/>
          </g>
          <g id="Group_112" data-name="Group 112">
            <path id="Path_66" data-name="Path 66" class="cls-1"
            d="M1471.9,787.609h-7.143V779.67h7.143Zm-5.3-1.844h3.455v-4.251H1466.6Z"/>
          </g>
          <g id="Group_113" data-name="Group 113">
            <rect id="Rectangle_39" data-name="Rectangle 39"
            class="cls-1" width="114.437" height="1.844" transform="translate(1395.969 819.731)"/>
          </g>
          <g id="Group_116" data-name="Group 116">
            <g id="Group_114" data-name="Group 114">
              <path id="Path_67" data-name="Path 67" class="cls-1"
              d="M1494.864,802.133l-8.089-5.683a30.716,30.716,0,0,
              1-13.047-25.112V760.331l.754-.141a45.714,45.714,0,0,0,
              17.974-7.466l2.549-1.776,1.856,1.343a45.427,45.427,0,0,0,
              17.614,7.741l1.525.313v11.342a30.049,30.049,0,0,1-12.761,
              24.563l-.531-.754.531.754Zm-19.292-40.273v9.478a28.874,28.874,
              0,0,0,12.264,23.6l7.028,4.937,7.313-5.137a28.2,28.2,0,0,0,
              11.979-23.055l-.05-9.85a47.207,47.207,0,0,
              1-18.325-8.053l-.8-.575-1.479,1.028A47.217,47.217,0,0,1,1475.572,761.86Z"/>
            </g>
            <g id="Group_115" data-name="Group 115">
              <path id="Path_68" data-name="Path 68" class="cls-1"
              d="M1491.1,783.618l-4.66-4.659,1.306-1.3,3.354,3.355,10.891-10.892,1.306,1.3Z"/>
            </g>
          </g>
        </g>
        <g id="Group_118" data-name="Group 118">
          <path id="Path_69" data-name="Path 69" class="cls-1"
          d="M1451.84,783.851h-47.593v-1.844h46.762l15.057-17,1.378,1.222Z"/>
        </g>
      </g>
      <g id="Group_122" data-name="Group 122">
        <g id="Group_120" data-name="Group 120" class="cls-2">
          <path id="Path_70" data-name="Path 70" class="cls-1"
          d="M1480.958,771.38v-8.585l.227-.04c5.994-1.119,11.7-5.119,
          16.816-8.418q-1.009-.654-1.988-1.359l-1.334-.964-2.025,
          1.409a46.879,46.879,0,0,1-18.205,7.617l-.227.041v10.3a29.934,
          29.934,0,0,0,12.725,24.493l7.6,5.338,3.368-2.366-4.232-2.972A29.934,
          29.934,0,0,1,1480.958,771.38Z"/>
        </g>
        <g id="Group_121" data-name="Group 121" class="cls-2">
          <path id="Path_71" data-name="Path 71" class="cls-1"
          d="M1404.248,782.928v37.725h7.376V782.928l15.758-17.394h-7.376Z"/>
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    classes: String,
  },
  computed: {
    getClasses() {
      const classesDefault = {
        'elixr-icon': true,
        home: true,
      };
      if (this.classes) {
        const classList = this.classes.split(' ');
        classList.forEach((classd) => {
          classesDefault[classd] = true;
        });
      }
      return classesDefault;
    },
  },
};
</script>
