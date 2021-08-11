<template>
  <div class="mt-12">
    <div>
      <h1 class="text-green-300 text-4xl">Changelog</h1>
      <h3 class="text-white text-lg">
        Here you will find regular updates for the Token Planet app
      </h3>
    </div>

    <div class="mt-6 text-white">
      <h1 class="text-green-300 text-3xl">Planned Features and Events</h1>
      <h3 class="text-md">
        We never ensure that we will develop the things mentioned below,
        <br />we will always put our focus to what we think is best for the time
        being.
      </h3>
      <ul class="list-disc pl-8">
        <li>Dividends tracker for listed tokens with that tokenomics</li>
        <li>Token list to find old, new and upcoming tokens</li>
      </ul>
    </div>

    <hr class="border-green-200 my-3" />

    <div>
      <Card
        v-for="item in changelog"
        :key="item.id"
        :title="item.title"
        :desc="item.desc"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/Changelog/Card.vue";
import changelog from "@/assets/data/changelog.json";

export default {
  name: "Changelog",
  components: {
    Card,
  },
  data() {
    return {
      changelog: null,
    };
  },
  methods: {},
  mounted() {
    this.changelog = changelog;
  },
};
</script>
