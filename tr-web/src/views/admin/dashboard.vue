<template>
    <div class="w-full px-5 lg:p-5">
        <div class="w-full flex items-start gap-4 justify-evenly flex-wrap">

            <div class="w-full md:w-[48%] bg-white p-4 border rounded-md">
                <div class="flex flex-row justify-between items-start pb-4">
                    <div class="text-base font-bold">
                        Total des Commandes
                    </div>
                    <date-picker v-model="commandesFilter" lang="fr" type="date" range :use-utc="true"
                        placeholder="Date"></date-picker>
                </div>
                <div class="w-full">
                    <bar-chart :chartOptions="charBarOptions" :chartData="charBarData"
                        :styles="{ padding: '5px', height: 'auto', width: '100%' }"></bar-chart>
                </div>
            </div>

            <div class="w-full md:w-[48%] h-full bg-white p-4 border rounded-md">
                <div class="flex flex-row justify-between items-start pb-4">
                    <div class="text-base font-bold">
                        Produits les plus demandé
                    </div>
                    <date-picker v-model="mostSellingProductsFilter" lang="fr" type="date" range :use-utc="true"
                        placeholder="Date"></date-picker>
                </div>
                <div class="w-full flex flex-col gap-5">
                    <div class="w-full">
                        <doughnut-chart :chartOptions="chartPieOptions" :chart-data="chartPie"
                            :styles="{ padding: '5px', height: 'auto', width: '100%' }"></doughnut-chart>
                    </div>

                </div>
            </div>
        </div>

        <div class="w-full mt-10  bg-white p-4 border rounded-md">
            <div class="flex flex-row justify-between items-start pb-4">
                    <div class="text-base font-bold">
                        Total des ventes
                    </div>
                    <date-picker v-model="mostSellingProductsFilter" lang="fr" type="date" range :use-utc="true"
                        placeholder="Date"></date-picker>
                </div>
            <line-chart :chartOptions="chartLineOptions" :chart-data="chartLine"
                :styles="{ padding: '5px', height: 'auto', width: '100%' }"></line-chart>
        </div>
    </div>

</template>

<script>
import BarChart from '@/components/charts/Bar.vue'
import DoughnutChart from '@/components/charts/Doughnut.vue'
import LineChart from '@/components/charts/Line.vue'

export default {
    name: 'adminDashboard',
    components: { BarChart, DoughnutChart, LineChart },
    data() {
        return {
            mostSellingProductsFilter: new Date(),
            commandesFilter: new Date(),

            charBarData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            charBarOptions: {
                datasets: {
                    bar: {
                        barPercentage: 0.8, // Adjust as needed
                        categoryPercentage: 0.8, // Adjust as needed
                        borderWidth: 1,
                        borderRadius: 10,
                    },
                },
                scales: {
                    x: {
                        stacked: false,

                    },
                    y: {
                        stacked: false,
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true,
                        },
                        grid: {
                            display: false,
                        }
                    },
                },
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'white', // Font color
                            fontSize: 14, // Font size
                            fontStyle: 'bold', // Font style
                            fontFamily: 'Arial', // Font family
                            usePointStyle: true,
                        }
                    },
                    datalabels: {
                        display: false,
                    },
                },
            },

            chartPie: {
                labels: ['KERASTASE', 'EUCERIN', 'ISDN', 'SENSILIS'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10],
                        hoverOffset: 3

                    }
                ]
            },
            chartPieOptions: {
                cutout: '75%',
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontColor: 'white', // Font color
                            fontSize: 14, // Font size
                            fontStyle: 'bold', // Font style
                            fontFamily: 'Arial', // Font family
                            usePointStyle: true,
                            // Use point style for legend marker
                        }
                    },
                    datalabels: {
                        display: false,
                        color: 'white',
                        font: {
                            weight: 'bold',
                            size: 17,
                        },
                        formatter: (value) => {
                            return value;
                        },
                    },
                }
            },

            chartLine: {
                labels: ['KERASTASE', 'EUCERIN', 'ISDN', 'SENSILIS'],
                datasets: [
                    {
                        backgroundColor: '#f87979',
                        data: [40, 20, 80, 10],
                    }
                ]

            },
            chartLineOptions: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
        
                    },
                    datalabels: {
                        display: false,
                    },
                }
            },

            isLoaded: false
        }
    },
    mounted() {
        this.$store.dispatch('setBreadCrumb', [
            {
                to: null,
                text: 'Dashboard'
            },
        ]),
            this.getCommands()
    },
    methods: {
        async getCommands() {
            try {
                const resp = await this.$http.get('/commande/all')
                if (resp.status) this.commands = resp.data
                this.isLoaded = true
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>