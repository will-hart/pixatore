module.exports = {
  guides: {
    Project: ['index', 'roadmap'],
    'Getting Started': ['getting_started'],
  },
  app: {
    Main: ['api/app/index', 'api/app/globals'],
    Modules: [
      'api/app/modules/_src_composables_mounteventbustoroom_',
      'api/app/modules/_src_composables_useclient_',
      'api/app/modules/_src_composables_useclientroomqueries_',
      'api/app/modules/_src_composables_useeventbus_',
      'api/app/modules/_src_composables_usefpsmonitor_',
      'api/app/modules/_src_composables_usegameengine_',
      'api/app/modules/_src_composables_useroom_',
      'api/app/modules/_src_composables_usewindowsize_',
      'api/app/modules/_src_gameengine_engine_',
      'api/app/modules/_src_gameengine_inputmanager_',
      'api/app/modules/_src_gameengine_spritestorage_',
      'api/app/modules/_src_gameengine_drawables_drawable_',
      'api/app/modules/_src_gameengine_drawables_groupdrawable_',
      'api/app/modules/_src_gameengine_drawables_spritedrawable_',
      'api/app/modules/_src_gameengine_drawables_textdrawable_',
      'api/app/modules/_src_gameengine_entitylinks_entitylink_',
      'api/app/modules/_src_gameengine_entitylinks_playerentitylink_',
      'api/app/modules/_src_gameengine_scenes_basescene_',
      'api/app/modules/_src_gameengine_scenes_loadingscene_',
      'api/app/modules/_src_gameengine_scenes_scenenavigator_',
      'api/app/modules/_src_gameengine_scenes_serverbrowserscene_',
      'api/app/modules/_src_gameengine_spritemap_',
      'api/app/modules/_src_gameengine_utilities_stack_',
      'api/app/modules/_src_main_',
      'api/app/modules/_src_router_index_',
      'api/app/modules/_src_store_index_',
      'api/app/modules/_src_store_modules_gamestatus_',
      'api/app/modules/_src_store_types_',
      'api/app/modules/_tests_unit_example_spec_',
    ],
    Interfaces: [
      'api/app/interfaces/_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue',
      'api/app/interfaces/_src_gameengine_drawables_drawable_.drawable',
      'api/app/interfaces/_src_store_types_.appstate',
      'api/app/interfaces/_src_store_types_.gamestatusmodulestate',
      'api/app/interfaces/_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue',
      'api/app/interfaces/_src_gameengine_drawables_drawable_.drawable',
      'api/app/interfaces/_src_store_types_.appstate',
      'api/app/interfaces/_src_store_types_.gamestatusmodulestate',
    ],
    Classes: [
      'api/app/classes/_src_gameengine_engine_.engine',
      'api/app/classes/_src_gameengine_inputmanager_.inputmanager',
      'api/app/classes/_src_gameengine_spritestorage_.spritestorage',
      'api/app/classes/_src_gameengine_drawables_groupdrawable_.groupdrawable',
      'api/app/classes/_src_gameengine_drawables_spritedrawable_.spritedrawable',
      'api/app/classes/_src_gameengine_drawables_textdrawable_.textdrawable',
      'api/app/classes/_src_gameengine_entitylinks_entitylink_.entitylink',
      'api/app/classes/_src_gameengine_entitylinks_playerentitylink_.playerentitylink',
      'api/app/classes/_src_gameengine_scenes_basescene_.basescene',
      'api/app/classes/_src_gameengine_scenes_loadingscene_.loadingscene',
      'api/app/classes/_src_gameengine_scenes_scenenavigator_.scenenavigator',
      'api/app/classes/_src_gameengine_scenes_serverbrowserscene_.serverbrowserscene',
      'api/app/classes/_src_gameengine_utilities_stack_.stack',
      'api/app/classes/_src_gameengine_engine_.engine',
      'api/app/classes/_src_gameengine_inputmanager_.inputmanager',
      'api/app/classes/_src_gameengine_spritestorage_.spritestorage',
      'api/app/classes/_src_gameengine_drawables_groupdrawable_.groupdrawable',
      'api/app/classes/_src_gameengine_drawables_spritedrawable_.spritedrawable',
      'api/app/classes/_src_gameengine_drawables_textdrawable_.textdrawable',
      'api/app/classes/_src_gameengine_entitylinks_entitylink_.entitylink',
      'api/app/classes/_src_gameengine_entitylinks_playerentitylink_.playerentitylink',
      'api/app/classes/_src_gameengine_scenes_basescene_.basescene',
      'api/app/classes/_src_gameengine_scenes_loadingscene_.loadingscene',
      'api/app/classes/_src_gameengine_scenes_scenenavigator_.scenenavigator',
      'api/app/classes/_src_gameengine_scenes_serverbrowserscene_.serverbrowserscene',
      'api/app/classes/_src_gameengine_utilities_stack_.stack',
    ],
    Enums: [
      'api/app/enums/_src_gameengine_spritemap_.spritekey',
      'api/app/enums/_src_store_types_.storenamespaces',
      'api/app/enums/_src_gameengine_spritemap_.spritekey',
      'api/app/enums/_src_store_types_.storenamespaces',
    ],
  },
  server: {
    Main: ['api/server/index', 'api/server/globals'],
    Modules: [
      'api/server/modules/_commands_command_',
      'api/server/modules/_commands_lobbycommands_',
      'api/server/modules/_index_',
      'api/server/modules/_rooms_gameroom_',
    ],
    Classes: [
      'api/server/classes/_commands_command_.command',
      'api/server/classes/_commands_command_.dispatcher',
      'api/server/classes/_commands_lobbycommands_.oncreatecommand',
      'api/server/classes/_commands_lobbycommands_.ongamestartcommand',
      'api/server/classes/_commands_lobbycommands_.onjoincommand',
      'api/server/classes/_commands_lobbycommands_.onleavecommand',
      'api/server/classes/_commands_lobbycommands_.onplayerreadycommand',
      'api/server/classes/_rooms_gameroom_.gameroom',
      'api/server/classes/_commands_command_.command',
      'api/server/classes/_commands_command_.dispatcher',
      'api/server/classes/_commands_lobbycommands_.oncreatecommand',
      'api/server/classes/_commands_lobbycommands_.ongamestartcommand',
      'api/server/classes/_commands_lobbycommands_.onjoincommand',
      'api/server/classes/_commands_lobbycommands_.onleavecommand',
      'api/server/classes/_commands_lobbycommands_.onplayerreadycommand',
      'api/server/classes/_rooms_gameroom_.gameroom',
    ],
  },
  shared: {
    Main: ['api/shared/index', 'api/shared/globals'],
    Modules: [
      'api/shared/modules/_constants_',
      'api/shared/modules/_eventbus_eventbus_',
      'api/shared/modules/_eventbus_eventbus_test_',
      'api/shared/modules/_eventbus_events_',
      'api/shared/modules/_eventbus_index_',
      'api/shared/modules/_index_',
      'api/shared/modules/_state_gamestate_',
      'api/shared/modules/_state_components_position_',
      'api/shared/modules/_state_components_index_',
      'api/shared/modules/_state_entities_player_',
      'api/shared/modules/_state_entities_status_',
      'api/shared/modules/_state_entities_index_',
      'api/shared/modules/_state_index_',
      'api/shared/modules/_types_index_',
      'api/shared/modules/_types_roomoptions_',
    ],
    Classes: [
      'api/shared/classes/_eventbus_eventbus_.eventbus',
      'api/shared/classes/_state_gamestate_.gamestate',
      'api/shared/classes/_state_components_position_.position',
      'api/shared/classes/_state_entities_player_.player',
      'api/shared/classes/_state_entities_status_.status',
      'api/shared/classes/_eventbus_eventbus_.eventbus',
      'api/shared/classes/_state_gamestate_.gamestate',
      'api/shared/classes/_state_components_position_.position',
      'api/shared/classes/_state_entities_player_.player',
      'api/shared/classes/_state_entities_status_.status',
    ],
    Enums: [
      'api/shared/enums/_eventbus_events_.eventtypes',
      'api/shared/enums/_types_index_.gamestatus',
      'api/shared/enums/_eventbus_events_.eventtypes',
      'api/shared/enums/_types_index_.gamestatus',
    ],
    Interfaces: [
      'api/shared/interfaces/_eventbus_events_.actormoveargs',
      'api/shared/interfaces/_eventbus_events_.playereventargs',
      'api/shared/interfaces/_types_roomoptions_.roomoptions',
      'api/shared/interfaces/_eventbus_events_.actormoveargs',
      'api/shared/interfaces/_eventbus_events_.playereventargs',
      'api/shared/interfaces/_types_roomoptions_.roomoptions',
    ],
  },
}