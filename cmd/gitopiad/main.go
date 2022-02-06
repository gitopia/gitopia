package main

import (
	"os"

	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/gitopia/gitopia/app"
	"github.com/gitopia/gitopia/cmd/gitopiad/cmd"
	"github.com/tendermint/starport/starport/pkg/cosmoscmd"
)

func main() {
	//rootCmd, _ := cmd.NewRootCmd()

	rootCmd, _ := cosmoscmd.NewRootCmd(
		app.Name,
		app.AccountAddressPrefix,
		app.DefaultNodeHome,
		app.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)
	rootCmd.AddCommand(cmd.MigrateCmd())

	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}
