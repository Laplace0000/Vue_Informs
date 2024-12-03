<script>
export default {
  props: {
    dataPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.dataPath);
        this.tableData = await response.json();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
};
</script>